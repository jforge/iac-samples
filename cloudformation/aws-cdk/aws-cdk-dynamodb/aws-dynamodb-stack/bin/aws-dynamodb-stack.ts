#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { AwsDynamodbStack } from '../lib/aws-dynamodb-stack';

const app = new cdk.App();
new AwsDynamodbStack(app, 'AwsDynamodbStack');
