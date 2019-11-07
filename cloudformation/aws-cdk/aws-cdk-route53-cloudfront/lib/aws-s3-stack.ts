import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import s3 = require('@aws-cdk/aws-s3');

export interface BucketProps extends cdk.StackProps {
  userBucket?: s3.IBucket;
}

export class BucketStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'CDKTestBucket', {
      bucketName: "test-lab-00x-de",
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code

    });
    new cdk.CfnOutput(this, 'Bucket', { value: this.bucket.bucketName });

    this.createReadWriteUser();
  }

  createReadWriteUser() {
    const user = new iam.User(this, 'CDKTestUser');

    if (this.bucket) {
      this.bucket.grantReadWrite(user);
    }
  }
}


