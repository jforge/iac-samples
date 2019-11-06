#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { Route53StackNewHostedZone, Route53StackPredefinedZone } from '../lib/aws-route53-stack';
import { BucketStack } from '../lib/aws-s3-stack';

const envEU = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
}

const app = new cdk.App();

// spawn an 'aliasable' resource (s3)
const target = new BucketStack(app, 'BucketStack', { env: envEU });

// create zone/recordset with alias to bucket resource
const primaryZoneName = "lab.00x.de";

new Route53StackNewHostedZone(app, 'AwsRoute53StackNewHostedZone',
  {
    env: envEU,
    primaryHostedZoneName: primaryZoneName
  });
new Route53StackPredefinedZone(app, 'Route53StackPredefinedZone',
  {
    env: envEU,
    userBucket: target.bucket,
    primaryHostedZoneName: primaryZoneName
  }
);
