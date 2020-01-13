#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { AwsCdkS3Stack } from '../lib/aws-cdk-s3-stack';

const app = new cdk.App();
new AwsCdkS3Stack(app, 'AwsCdkS3Stack');
