import { Construct, Stack, StackProps, RemovalPolicy, CfnOutput } from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Bucket } from '@aws-cdk/aws-s3';
import { Table, TableProps, AttributeType, BillingMode } from '@aws-cdk/aws-dynamodb';
import { StringParameter, StringParameterProps } from '@aws-cdk/aws-ssm';

export class SpeechSynthesisStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const storageBucketName: string = "speech-synthesis-storage";
    const speechSynthesisDataTableName: string = "Speech-Synthesis-Data";

    // DynamoDB
    const tableProps: TableProps = {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      sortKey: { name: 'uri', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: speechSynthesisDataTableName
    };
    new Table(this, 'SpeechSynthesisTable', tableProps);

    // Create a new SSM parameter holding the table name
    const parameterProps: StringParameterProps = {
      description: 'name of the speech synthesis data dynamodb table',
      parameterName: '/DeploymentConfig/dev/SpeechSynthesis/DynamoDB/TableName',
      stringValue: speechSynthesisDataTableName
    };
    new StringParameter(this, 'StringParameter', parameterProps);


    // MP3 Storage
    const siteBucket = new Bucket(this, 'SpeechSynthesisBucket', {
      bucketName: storageBucketName,
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.RETAIN
    });
    new CfnOutput(this, 'Bucket', { value: siteBucket.bucketWebsiteUrl });

    // Speech Synthesis Function

    // Lambda Nodejs Shortcut with Parcel Bundler source
    // new lambda.NodejsFunction(this, 'my-handler');
    // ├── stack.ts # defines a 'NodejsFunction' with 'my-handler' as id
    // ├── stack.my - handler.ts # exports a function named 'handler'

    new NodejsFunction(this, 'speechSynthesisHandler');

  }
}
