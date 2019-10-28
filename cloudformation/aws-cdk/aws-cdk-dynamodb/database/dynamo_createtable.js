'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbResource();

var params = { 
  TableName: config.aws.dynamodb.tableName,
  AttributeDefinitions: [
    {
      AttributeName: 'host',
      AttributeType: 'S'
    },
    {
      AttributeName: 'uri',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'host',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'uri',
      KeyType: 'RANGE'
    }
  ],
  BillingMode: config.aws.dynamodb.billingMode,
  // ProvisionedThroughput: {
  //   ReadCapacityUnits: 1,
  //   WriteCapacityUnits: 1
  // },
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});
