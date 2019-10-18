#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { StackLambdaS3Stack } from '../lib/stack-lambda-s3-stack';

const app = new cdk.App();
new StackLambdaS3Stack(app, 'StackLambdaS3Stack');
