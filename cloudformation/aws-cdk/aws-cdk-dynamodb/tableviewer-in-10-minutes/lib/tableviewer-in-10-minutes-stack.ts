import { Table, TableProps, AttributeType, BillingMode, CfnTable } from '@aws-cdk/aws-dynamodb';
import cdk = require('@aws-cdk/core');
import { TableViewer } from 'cdk-dynamo-table-viewer'
import { RemovalPolicy } from '@aws-cdk/core';

export class TableviewerIn10MinutesStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let tableName: string = "CDK-built-Table";

    const tableProps: TableProps = {
      partitionKey: { name: 'host', type: AttributeType.STRING },
      sortKey: { name: 'uri', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: tableName
    };

    const table = new Table(this, 'Routing-Rules-Table', tableProps);

    const viewer = new TableViewer(this, 'TableViewer', {
      table: table,
      title: 'Table Contexnt',
      sortBy: '-uri'
    });

  }
}
