import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import AwsDynamodbStack = require('../lib/aws-dynamodb-stack');
import { Table, TableOptions, CfnTable } from '@aws-cdk/aws-dynamodb';
import { CfnResource } from '@aws-cdk/core';

test('Synthesized Stack is not empty', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsDynamodbStack.AwsDynamodbStack(app, 'DynamodDbTestStack');
    // THEN
    expectCDK(stack).notTo(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});

test('KeySchema in Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsDynamodbStack.AwsDynamodbStack(app, 'DynamodDbTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::DynamoDB::Table", {
    KeySchema: [
      {
        "AttributeName": "host",
        "KeyType": "HASH"
      },
      {
        "AttributeName": "url",
        "KeyType": "RANGE"
      }
    ]
  }));
});

test('BillingMode is Pay_per_request', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsDynamodbStack.AwsDynamodbStack(app, 'DynamodDbTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::DynamoDB::Table", {
    BillingMode: "PAY_PER_REQUEST"
  }));
});

test('Dedicated table name as expected', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsDynamodbStack.AwsDynamodbStack(app, 'DynamodDbTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::DynamoDB::Table", {
    TableName: "Routing-Rules"
  }));
});

test('UpdateReplace and Deletion Policy are set to "Retain"', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsDynamodbStack.AwsDynamodbStack(app, 'DynamodDbTestStack');
  // THEN
  const table = stack.node.children[0] as Table;
  const resource = table.node.findChild('Resource') as CfnResource;
  expect(resource.cfnOptions).toStrictEqual({
    "deletionPolicy": "Retain",
    "updateReplacePolicy": "Retain"
  });

});