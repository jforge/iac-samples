#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NodejsFunction, NodejsFunctionProps } from '@aws-cdk/aws-lambda-nodejs';

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
    let functionProperties: NodejsFunctionProps = {
      entry: './index.the-handler.ts',
      handler: 'handler'
    };
    new NodejsFunction(this, 'thehandler', functionProperties);
    */


    // Classic approach
    /*
    const lambdaFn = new lambda.Function(this, 'Singleton', {
      code: new lambda.InlineCode(fs.readFileSync('lambda-handler.js', { encoding: 'utf-8' })),
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.NODEJS_10_X,
    });
    */
  }
}

const app = new cdk.App();
new HigherLevelLambdaStack(app, 'HigherLevelLambdaStack');

