#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { Route53StackNewHostedZone, Route53StackPredefinedZone } from '../lib/aws-route53-stack';

const app = new cdk.App();
new Route53StackNewHostedZone(app, 'AwsRoute53StackNewHostedZone');
new Route53StackPredefinedZone(app, 'Route53StackPredefinedZone');
