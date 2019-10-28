'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbDocumentClientResource();

var params = {
  TableName: config.aws.dynamodb.tableName,
  Item: {
    'host' : 'www.things.codes',
    'uri' : '/api',
    'redirects' : [
        { "trigger": "default", "setURI": "/index.html", "setOrigin": "https://api.things.codes" }
    ]
  },
  ConditionExpression: "attribute_not_exists(uri)"
};

// Call DynamoDB to add the item to the table
dynamodb.put(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
