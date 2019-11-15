'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

//var dynamodb = resourceBuilder.buildDynamoDbResource();
var dynamodb = resourceBuilder.buildDynamoDbDocumentClientResource();

var params = {
  TableName: config.aws.dynamodb.tableName,
  Item: {
    'host' : 'www.things.codes',
    'uri' : '/api',
    'redirects' : [
        { "selector": "default", "setPath": "/index.html", "setOrigin": "https://api.things.codes" }
    ]
  },
  ConditionExpression: "attribute_not_exists(uri)"
};

var params = {
  RequestItems: {
    [config.aws.dynamodb.tableName]: [
    {
      PutRequest: {
        Item: {
          'host' : 'www.things.codes',
          'uri' : '/api',
          'redirects' : [
            { "selector": "default", "setPath": "/index.html", "setOrigin": "https://api.things.codes" }
          ]
        }
      }
    },
    {
      PutRequest: {
        Item: {
          'host' : 'www.things.codes',
          'uri' : '/demo',
          'redirects' : [
            { "selector": "default", "setPath": "/index.html", "setOrigin": "https://demo.things.codes" }
          ]
        }
      }
    },
    {
      PutRequest: {
        Item: {
          'host' : 'test-site.lab.00x.de',
          'uri' : '/signin',
          'redirects' : [
            { "selector":"default", "setPath": "/index.html", "setOrigin": "https://sign.immowelt.de" }
          ]
        }
      }
    }
   ]
  }
};

dynamodb.batchWrite(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
