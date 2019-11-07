import {expect as expectCDK, matchTemplate, MatchStyle, haveResource} from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import {BucketStack} from '../lib/s3-stack';
import {Stack} from "@aws-cdk/core";

describe('New Bucket can be created', () => {
  test('S3 Bucket Stack', () => {
    const app = new cdk.App();
    const parentStack = new Stack(app, 'parent-stack', {
      env: {account: '000000', region: 'eu-central-1'}
    });

    // WHEN
    const stack = new BucketStack(parentStack, 'TheNestedBucketStack');
    const assembly = app.synth();

    // THEN
    expect(assembly.artifacts).toHaveLength(2);

    expectCDK(stack).to(haveResource("AWS::S3::Bucket", {
      BucketName: "test-lab-00x-de",
      WebsiteConfiguration: {
        ErrorDocument: "error.html",
        IndexDocument: "index.html"
      }
    }));
  });
});
