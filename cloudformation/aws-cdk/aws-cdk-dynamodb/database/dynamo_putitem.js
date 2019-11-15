'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbResource();

var params = {
  TableName: config.aws.dynamodb.tableName,
  Item: {
    'host' : {S: 'www.things.codes'},
    'uri' : {S: '/demo'},
    'redirects' : {L : [
        {
          "M": {
            "setPath": {
              "S": "/index.html"
            },
            "setOrigin": {
              "S": "https://demo.things.codes"
            },
            "selector": {
              "S": "default"
            }
          }
        }
      ]
    }
  }
};

// Call DynamoDB to add the item to the table
dynamodb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
