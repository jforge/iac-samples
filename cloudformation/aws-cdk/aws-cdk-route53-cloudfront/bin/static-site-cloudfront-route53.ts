#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import {Route53MultiStack} from '../lib/route53-stack';

// primary environment for site resources
const envEU = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
};

// environment required for ACM certificates reference
const envUSEast1 = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: "us-east-1"
};

const primaryZoneName: string = "lab.00x.de";
const useExistingHostedZone: boolean = true;
const siteDomain: string = `test-site.${primaryZoneName}`;

const app = new cdk.App();

// build the route53-cloudfront stack
new Route53MultiStack(app, 'StaticSiteStack', {
  env: envEU,
  primaryHostedZoneName: primaryZoneName,
  usePredefinedZone: useExistingHostedZone,
  siteDomain: siteDomain
});
