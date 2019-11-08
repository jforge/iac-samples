import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import s3 = require('@aws-cdk/aws-s3');
import cloudfront = require('@aws-cdk/aws-cloudfront');
import path = require('path');

export class LambdaEdgeCloudfrontStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);

    const sourceBucket = new s3.Bucket(this, 'Bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const lambdaFunction = new lambda.Function(this, 'Lambda', {
      code: lambda.Code.fromAsset(path.join(__dirname, 'assets', 'viewer-request-handler')),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X
    });

    const lambdaVersion = new lambda.Version(this, 'LambdaVersion', {
      lambda: lambdaFunction
    });

    new cloudfront.CloudFrontWebDistribution(this, 'MyDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: sourceBucket
          },
          behaviors: [{
            isDefaultBehavior: true, lambdaFunctionAssociations: [{
              eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
              lambdaFunction: lambdaVersion
            }]
          }]
        }
      ]
    });
  }
}

const app = new cdk.App();
new LambdaEdgeCloudfrontStack(app, 'LambdaEdgeCloudfrontExample');

app.synth();
