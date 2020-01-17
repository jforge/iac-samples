#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkSagemakerStack } from '../lib/aws-cdk-sagemaker-stack';

const app = new cdk.App();
new AwsCdkSagemakerStack(app, 'AwsCdkSagemakerStack');
