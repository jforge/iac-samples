import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');
import iam = require('@aws-cdk/aws-iam');

export interface BucketProps extends cdk.StackProps {
  userBucket?: s3.IBucket;
}

export class BucketStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'CDKTestBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true
    });

    this.createReadWriteUser();
  }

  createReadWriteUser() {
    const user = new iam.User(this, 'CDKTestUser');

    if (this.bucket) {
      this.bucket.grantReadWrite(user);
    }
  }
}


