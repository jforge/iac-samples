import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

export class SpeechSynthesisStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Nodejs Shortcut with Parcel Bundler source

    // new lambda.NodejsFunction(this, 'my-handler');
    // ├── stack.ts # defines a 'NodejsFunction' with 'my-handler' as id
    // ├── stack.my - handler.ts # exports a function named 'handler'

    new NodejsFunction(this, 'speechSynthesisHandler');

  }
}
