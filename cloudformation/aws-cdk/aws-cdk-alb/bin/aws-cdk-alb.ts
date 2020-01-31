#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AwsCdkAlbStack } from '../lib/aws-cdk-alb-stack';

const app = new cdk.App();
new AwsCdkAlbStack(app, 'AwsCdkAlbStack');
