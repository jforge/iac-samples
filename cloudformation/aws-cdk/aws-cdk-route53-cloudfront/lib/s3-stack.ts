import cdk = require('@aws-cdk/core');
import {User} from '@aws-cdk/aws-iam';
import {Bucket, IBucket} from '@aws-cdk/aws-s3';
import {NestedStack, NestedStackProps} from "@aws-cdk/aws-cloudformation";
import {Construct} from "@aws-cdk/core";

export class BucketStack extends NestedStack {
  public readonly bucket: IBucket;

  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    this.bucket = new Bucket(this, 'CDKTestBucket', {
      bucketName: "test-lab-00x-de",
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    new cdk.CfnOutput(this, 'Bucket', {value: this.bucket.bucketName});

    this.createReadWriteUser();
  }

  createReadWriteUser() {
    const user = new User(this, 'CDKTestUser');

    if (this.bucket) {
      this.bucket.grantReadWrite(user);
    }
  }
}
