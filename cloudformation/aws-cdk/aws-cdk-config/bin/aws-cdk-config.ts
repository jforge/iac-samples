#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkConfigStack } from '../lib/aws-cdk-config-stack';

const app = new cdk.App();
new AwsCdkConfigStack(app, 'AwsCdkConfigStack');
