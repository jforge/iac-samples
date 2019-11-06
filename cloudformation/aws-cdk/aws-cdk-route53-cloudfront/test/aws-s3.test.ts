import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import { BucketStack } from '../lib/aws-s3-stack';


describe('New Bucket can be created', () => {
  test('S3 Bucket Stack', () => {
    const app = new cdk.App();

    // WHEN
    const stack = new BucketStack(app, 'TheAwsRoute53Stack',
      {
        env: { account: '000000', region: 'eu-central-1' }
      });

    // THEN
    expectCDK(stack).to(haveResource("AWS::S3::Bucket", {
      BucketName: "test-lab-00x-de",
      WebsiteConfiguration: {
        ErrorDocument: "error.html",
        IndexDocument: "index.html"
      }
     }));
  });
})
