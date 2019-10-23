#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { AwsDynamodbStackStack } from '../lib/aws-dynamodb-stack-stack';

const app = new cdk.App();
new AwsDynamodbStackStack(app, 'AwsDynamodbStackStack');
