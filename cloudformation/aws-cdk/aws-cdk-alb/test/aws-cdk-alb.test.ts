import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import AwsCdkAlb = require('../lib/aws-cdk-alb-stack');

test('ALB Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsCdkAlb.AwsCdkAlbStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ElasticLoadBalancingV2::LoadBalancer", {
    Scheme: 'internet-facing'
  }));
});

