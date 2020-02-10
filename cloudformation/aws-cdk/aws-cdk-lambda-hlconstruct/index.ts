#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

export class HigherLevelLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Nodejs Shortcut with Parcel Bundler source

    // new lambda.NodejsFunction(this, 'my-handler');
    // ├── stack.ts # defines a 'NodejsFunction' with 'my-handler' as id
    // ├── stack.my - handler.ts # exports a function named 'handler'

    new NodejsFunction(this, 'the-handler');

    // This file is used as "entry" for Parcel.
    // This means that your code is automatically transpiled and bundled
    // whether it's written in JavaScript or TypeScript.

    // Alternatively, an entry file and handler can be specified:
    /*
    new NodejsFunction(this, 'MyFunction', {
      entry: '/path/to/my/file.ts',
      handler: 'myExportedFunc'
    });
    */
  }
}

const app = new cdk.App();
new HigherLevelLambdaStack(app, 'HigherLevelLambdaStack');

