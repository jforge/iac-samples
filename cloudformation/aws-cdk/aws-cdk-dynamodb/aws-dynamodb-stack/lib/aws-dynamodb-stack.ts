import { Stack, Construct, StackProps, RemovalPolicy } from '@aws-cdk/core';
import { Table, AttributeType, BillingMode, CfnTable } from '@aws-cdk/aws-dynamodb';

export class AwsDynamodbStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // create table
    const table = new Table(this, 'routing-rules', {
      partitionKey: { name: 'host', type: AttributeType.STRING },
      sortKey: { name: 'url', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.RETAIN,
      tableName: "Routing-Rules"
    });

    // import data    

  }
}
