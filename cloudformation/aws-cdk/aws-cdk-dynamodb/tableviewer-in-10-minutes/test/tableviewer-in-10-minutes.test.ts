import { expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import TableviewerIn10Minutes = require('../lib/tableviewer-in-10-minutes-stack');

test('DynamoDB Table Viewer Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new TableviewerIn10Minutes.TableviewerIn10MinutesStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResourceLike("AWS::DynamoDB::Table", {
    BillingMode: "PAY_PER_REQUEST",
    TableName: "CDK-built-Table"
  }));
});
