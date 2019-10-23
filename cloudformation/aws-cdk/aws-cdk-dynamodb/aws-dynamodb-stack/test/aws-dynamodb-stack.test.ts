import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import AwsDynamodbStack = require('../lib/aws-dynamodb-stack-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsDynamodbStack.AwsDynamodbStackStack(app, 'MyTestStack');
    // THEN
    // expectCDK(stack).to(matchTemplate({
    //   "Resources": {}
    // }, MatchStyle.EXACT))

    expectCDK(stack).to(haveResource("AWS::DynamoDB::Table", {
      KeySchema: [
        {
          "AttributeName": "host",
          "KeyType": "HASH"
        }]
    }));
});