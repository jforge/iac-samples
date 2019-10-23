import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import AwsRoute53 = require('../lib/aws-route53-stack');

test('AwsRoute53 Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsRoute53.Route53Stack(app, 'TheAwsRoute53Stack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::Route53::HostedZone", {
    Name: "cdktest.things.codes."
  }));

});
