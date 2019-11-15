'use strict';

const resourceBuilder = require('./aws_resource_builder.js');

var dynamodb = resourceBuilder.buildDynamoDbResource();

var params = {
  TableName: process.argv[2]
};

// Call DynamoDB to delete the specified table
dynamodb.deleteTable(params, function(err, data) {
  if (err && err.code === 'ResourceNotFoundException') {
    console.log("Error: Table not found");
  } else if (err && err.code === 'ResourceInUseException') {
    console.log("Error: Table in use");
  } else {
    console.log("Success", data);
  }
});
