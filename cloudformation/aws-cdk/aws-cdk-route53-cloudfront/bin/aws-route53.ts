#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
 import { Route53Stack } from '../lib/aws-route53-stack';

const app = new cdk.App();
new Route53Stack(app, 'AwsRoute53Stack');
