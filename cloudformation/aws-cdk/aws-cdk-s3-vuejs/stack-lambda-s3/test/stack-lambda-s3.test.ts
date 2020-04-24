import { expect as expectCDK, haveResource} from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import StackLambdaS3 = require('../lib/stack-lambda-s3-stack');

test('Lambda Queue Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new StackLambdaS3.StackLambdaS3Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Timeout: 300
    }));
});
