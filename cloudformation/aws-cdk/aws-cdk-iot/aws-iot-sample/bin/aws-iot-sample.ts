#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsIotSampleStack } from '../lib/aws-iot-sample-stack';

const app = new cdk.App();
new AwsIotSampleStack(app, 'AwsIotSampleStack');
