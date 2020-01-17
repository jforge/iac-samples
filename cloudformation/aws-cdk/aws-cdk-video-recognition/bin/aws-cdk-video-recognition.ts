#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkVideoRecognitionStack } from '../lib/aws-cdk-video-recognition-stack';

const app = new cdk.App();
new AwsCdkVideoRecognitionStack(app, 'AwsCdkVideoRecognitionStack');
