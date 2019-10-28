'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbDocumentClientResource();

var params = {
  TableName: config.aws.dynamodb.tableName,
  Key: {
    'host' : 'www.things.codes',
    'uri' : '/demo'
  }
};

// Call DynamoDB to delete the item to the table
dynamodb.delete(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
