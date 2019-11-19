import { Stack, Construct, StackProps, RemovalPolicy } from '@aws-cdk/core';
import { Table, TableProps, AttributeType, BillingMode } from '@aws-cdk/aws-dynamodb';
import { StringParameter, StringParameterProps } from '@aws-cdk/aws-ssm';

export class AwsDynamodbStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const tableName: string = "Routing-Rules";

    const tableProps: TableProps = {
      partitionKey: { name: 'host', type: AttributeType.STRING },
      sortKey: { name: 'url', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.RETAIN,
      tableName: tableName
    }

    const table = new Table(this, 'routing-rules', tableProps);

    const parameterProps: StringParameterProps = {
      description: 'name of the routing rules dynamodb table',
      parameterName: 'routing_rules_table_name',
      stringValue: tableName
    };

    // Create a new SSM Parameter holding a String
    const param = new StringParameter(this, 'StringParameter', parameterProps);

  }
}
