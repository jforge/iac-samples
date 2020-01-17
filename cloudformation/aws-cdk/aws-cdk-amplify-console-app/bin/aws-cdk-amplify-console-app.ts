#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkAmplifyConsoleAppStack } from '../lib/aws-cdk-amplify-console-app-stack';

const app = new cdk.App();
new AwsCdkAmplifyConsoleAppStack(app, 'AwsCdkAmplifyConsoleAppStack');
