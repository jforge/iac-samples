'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbDocumentClientResource();

var params = {
  TableName: config.aws.dynamodb.tableName,
  Key : { 
    'host': 'www.things.codes', 
    'uri': '/api' 
  }
} 

dynamodb.get(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Item);
  }
});
