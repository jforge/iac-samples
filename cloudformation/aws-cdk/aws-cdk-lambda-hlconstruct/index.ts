#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

export class SimplifiedInitTemplateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }
}

const app = new cdk.App();
new SimplifiedInitTemplateStack(app, 'SimplifiedInitTemplateStack');

