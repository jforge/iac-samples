import { Handler, Context, Callback } from 'aws-lambda';
import { DynamoDB, Polly, S3, SQS } from 'aws-sdk';
const Stream = require('stream');
const Fs = require('fs');

const db = new DynamoDB.DocumentClient();

const TABLE_NAME: string = process.env.TABLE_NAME || '';
const BUCKET_NAME: string = process.env.BUCKET_NAME || '';
const SQS_URL: string = process.env.SQS_URL || '';

const convertTextToVoice = (data: any, callback: Callback) => {
  const polly = new Polly();

  let params = {
    OutputFormat: "mp3",
    SampleRate: "8000",
    Text: data.text,
    TextType: "text",
    VoiceId: data.voice
  };

  polly.synthesizeSpeech(params, callback);
}

const saveToS3 = (postId: string, filePath: string, callback: (err: any, data: any) => void) => {
  const s3 = new S3();
  const readStream = Fs.createReadStream(filePath);
  var params = {
    Bucket: BUCKET_NAME,
    Key: postId + ".mp3",
    Body: readStream,
    ACL: "public-read"
  };

  s3.upload(params, callback);
}

const deleteSQSMessage = (receiptHandle: any) => {
  const sqs = new SQS();
  sqs.deleteMessage({
    QueueUrl: SQS_URL,
    ReceiptHandle: receiptHandle
  });
}

const updateRecord = (postId: any, status: string, url: any, callback: Callback) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      "id": postId
    },
    UpdateExpression: "set #statusAtt = :s, #urlAtt=:u",
    ExpressionAttributeNames: {
      "#statusAtt": "status",
      "#urlAtt": "url"
    },
    ExpressionAttributeValues: {
      ":s": status,
      ":u": url
    }
  };

  db.update(params, callback);
}

export const handler: Handler = (event: any, context: Context, callback: Callback) => {
  const postId = event["Records"][0].body;
  const receiptHandle = event["Records"][0].receiptHandle;

  deleteSQSMessage(receiptHandle);

  console.log('Converting Post', postId);

  const params = {
    TableName: TABLE_NAME,
    Key: {
      "id": postId
    }
  };

  /*
  db.get(params, (err: any, data: any) => {
    if (err) {
      context.succeed({ success: false, error: err });
    } else {
      console.log('Converting Text', data.Item.text, 'to voice', data.Item.voice);

      convertTextToVoice(data.Item, (err: any, data: any) => {
        if (err) {
          context.succeed({ success: false, error: err });
        } else {
          if (data.AudioStream instanceof Buffer) {
            const filePath = "/tmp/" + postId + ".mp3";

            Fs.writeFile(filePath, data.AudioStream, function (err: any) {
              if (err) {
                context.succeed({ success: false, error: err });
              } else {
                console.log('File ready to upload', filePath);

                saveToS3(postId, filePath, (err: any, data: { Location: any; }) => {
                  if (err) {
                    context.succeed({ success: false, error: err });
                  } else {
                    updateRecord(postId, 'READY', data.Location, (err: any, data: any) => {
                      if (err) {
                        context.succeed({ success: false, error: err });
                      } else {
                        context.succeed({ success: true, data: data });
                      }
                    })
                  }
                });
              }
            })
          }
        }
      });
    }
  });
  */
};
