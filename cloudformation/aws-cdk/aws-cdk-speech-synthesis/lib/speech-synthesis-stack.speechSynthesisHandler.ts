import { DynamoDB, Rekognition, Polly, S3 } from 'aws-sdk';

const dynamoDb: DynamoDB.DocumentClient = new DynamoDB.DocumentClient()
const rekognition: Rekognition = new Rekognition({ apiVersion: '2016-06-27' })
const polly: Polly = new Polly()
const s3: S3 = new S3({ signatureVersion: 'v4' })

const contentBucket: string = process.env.CONTENT_BUCKET || ''
const dynamoTableName: string = process.env.DYNAMO_TABLE || ''
const voiceId: string = 'Mads'
const noText: string = "Nothing found"
const outputFolder: string = "output/"
const outputFormat: string = "mp3"

async function saveReferencesToDynamo(item: any) {
  return await new Promise((resolve, reject) => {
    var params = {
      TableName: dynamoTableName,
      Item: item
    }
    dynamoDb.put(params, (error: any, data: any) => {
      if (error) {
        console.error(`error in save reference to dynamo: ${error.stack}`)
        reject({
          statusCode: 400,
          error: `Could not create message: ${error.stack}`
        })
      } else {
        console.log(`saved reference data: ${JSON.stringify(data)}`)
        resolve({
          statusCode: 200,
          body: JSON.stringify(params.Item)
        })
      }
    })
  })
}

function savePollyResultToS3(bucket: string, objectKey: string, audioStream: any) {
  return s3.putObject({
    Bucket: bucket,
    Key: objectKey,
    Body: audioStream,
    ContentType: 'audio/' + outputFormat
  }).promise()
    .catch(error => {
      console.error(`error in save reference to dynamo: ${error}`)
    })
}

async function readText(text: string, voiceId: string, outputObjectKey: string) {
  let audio = await polly.synthesizeSpeech({
    Text: text,
    OutputFormat: outputFormat,
    VoiceId: voiceId
  }).promise()
  if (audio.AudioStream instanceof Buffer) {
    await savePollyResultToS3(contentBucket, outputObjectKey, audio.AudioStream)
    return outputObjectKey
  } else {
    console.error(`audiostream is not a buffer`)
  }
}

function detectTextFromBytes(bytes: any): Promise<any> {
  return rekognition
    .detectText({
      Image: {
        Bytes: bytes
      }
    })
    .promise()
    .catch(error => {
      console.error(`error in detecting text: ${error}`)
    })
}

function getBase64BufferFromS3(objectKey: string) {
  return s3.getObject({
    Bucket: contentBucket,
    Key: objectKey,
  }).promise()
    .then(response => response.Body)
    .catch(error => {
      console.error(`error in detecting text: ${error}`)
    })
}

async function rekognizeText(rawObjectKey: string) {
  const bytes = await getBase64BufferFromS3(rawObjectKey)
  if (!bytes) return noText
  let text: any = await detectTextFromBytes(bytes)
  text = text && text.TextDetections ? text.TextDetections.map(i => i.DetectedText).join(" ") : noText
  return text
}

async function startDetection(rawObjectKey: string) {
  let lastElementFromPathLikeRawObjectKey: string = rawObjectKey.split("/").pop() || 'unknown';
  const speachObjectKey = outputFolder + lastElementFromPathLikeRawObjectKey.replace(/\.[^/.]+$/, "") + ".mp3"
  const textRekognized = await rekognizeText(rawObjectKey)
  console.log(textRekognized)
  const outputObjectKey = await readText(textRekognized, voiceId, speachObjectKey)
  if (!outputObjectKey) {
    console.error(`error in reading text`)
  }
  console.log(outputObjectKey)
  const result = {
    id: rawObjectKey,
    raw_object_key: rawObjectKey,
    text_rekognized: textRekognized,
    speach_object_key: outputObjectKey,
  }
  return await saveReferencesToDynamo(result)
}

exports.handler = async function (event: any, context: any) {
  try {
    console.log("Environmen/rt\n" + JSON.stringify(process.env, null, 2))
    console.info("LogStream Name: " + context.logStreamName)
    console.log("Event:\r\n" + JSON.stringify(event))
    console.log(JSON.parse(event.Records[0].body).Records[0].s3.object.key)
    console.log(event.Records[0].receiptHandle)
    const result = await startDetection(JSON.parse(event.Records[0].body).Records[0].s3.object.key)
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
