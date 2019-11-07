import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import AwsRoute53 = require('../lib/route53-stack');
import { Bucket } from '@aws-cdk/aws-s3';

describe('New Hosted Zone can be setup', () => {
  test('AwsRoute53 New Hosted Zone Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsRoute53.Route53MultiStack(app, 'TheAwsRoute53Stack', {
      usePredefinedZone: false,
      primaryHostedZoneName: "lab.00x.de"
    }
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

    const deploymentRegion: string = "us-east-1";

    const testStack = new cdk.Stack(undefined, 'TestStack', { env: { account: '000000', region: deploymentRegion } });
    const bucket = new Bucket(testStack, "testBucket");

    const primaryZoneName: string = "lab.00x.de";
    const siteDomain: string = `test-site.${primaryZoneName}`;

    const stack = new AwsRoute53.Route53MultiStack(app, 'TheAwsRoute53Stack',
      {
        env: { account: '000000', region: deploymentRegion },
        usePredefinedZone: true,
        userBucket: bucket,
        primaryHostedZoneName: primaryZoneName,
        siteDomain: siteDomain
      });

    // THEN
    expectCDK(stack).to(haveResource("AWS::Route53::RecordSet", {
      Name: "test-site.lab.00x.de.",
      Type: "A"
    }));

    expectCDK(stack).to(haveResource("AWS::Route53::RecordSet", {
      Name: "www.test-site.lab.00x.de.",
      Type: "CNAME"
    }));
  });
});
