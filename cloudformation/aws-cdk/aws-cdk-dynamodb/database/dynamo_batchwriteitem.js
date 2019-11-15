'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbResource();

var params = {
  RequestItems: {
    [config.aws.dynamodb.tableName]: [
       {
         PutRequest: {
           Item: {
            "host": { "S": "www.things.codes" },
            "uri": { "S": "/api" },
            "redirects": { "S": "{ 'selector': 'default' }" }
           }
         }
       },
       {
         PutRequest: {
           Item: {
            "host": { "S": "www.things.codes" },
            "uri": { "S": "/demo" },
            "redirects": { "S": "{ 'selector': 'default' }" }
           }
         }
       }
    ]
  }
};

dynamodb.batchWriteItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
