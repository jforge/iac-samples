import cdk = require('@aws-cdk/core');
import dynamodb = require('@aws-cdk/aws-dynamodb');

export class AwsDynamodbStackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create table
    const table = new dynamodb.Table(this, 'routing-rules', {
      partitionKey: { name: 'host', type: dynamodb.AttributeType.STRING }
    });
    
    // import data
    

  }
}
