#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export class SimplifiedInitTemplateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }
}

const app = new cdk.App();
new SimplifiedInitTemplateStack(app, 'SimplifiedInitTemplateStack');

