import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import AwsRoute53 = require('../lib/aws-route53-stack');
import { BucketStack } from '../lib/aws-s3-stack';
import { Bucket } from '@aws-cdk/aws-s3';
import { HostedZone } from '@aws-cdk/aws-route53';

describe('New Hosted Zone can be setup', () => {
  test('AwsRoute53 New Hosted Zone Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsRoute53.Route53StackNewHostedZone(app,
      'TheAwsRoute53Stack',
      { primaryHostedZoneName: "lab.00x.de" }
    );
    // THEN
    expectCDK(stack).to(haveResource("AWS::Route53::HostedZone", {
      Name: "test-zone.lab.00x.de."
    }));

  });
})

describe('Existing Hosted Zone can be enhanced', () => {
  test('AwsRoute53 Predefined Zone Stack', () => {
    const app = new cdk.App();
    const testStack = new cdk.Stack(undefined, 'TestStack', { env: { account: '000000', region: 'eu-central-1' } });
    const bucket = new Bucket(testStack, "testBucket");

    // WHEN
    const stack = new AwsRoute53.Route53StackPredefinedZone(app, 'TheAwsRoute53Stack',
      {
        env: { account: '000000', region: 'eu-central-1' },
        userBucket: bucket,
        primaryHostedZoneName: "lab.00x.de"
      });

    // THEN
    expectCDK(stack).to(haveResource("AWS::Route53::RecordSet", {
      Name: "test-alias.lab.00x.de.",
      Type: "A"
    }));
  });
})

