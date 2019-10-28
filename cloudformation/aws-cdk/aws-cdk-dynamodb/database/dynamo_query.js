'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbDocumentClientResource();

var params = {
  TableName: config.aws.dynamodb.tableName,
  KeyConditionExpression: '#host = :host and begins_with (#uri, :uri)',
  FilterExpression: 'contains (#redirects, :origin)',
  ExpressionAttributeNames: {
    '#host': 'host',
    '#uri': 'uri',
    '#redirects': 'redirects'
  },
  ExpressionAttributeValues: {
    ':host': 'www.things.codes',
    ':uri': '/api',
    ':origin': { 
      "setURI":"/index.html", 
      "setOrigin":"https://api.things.codes" 
    }
  }
};
dynamodb.query(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", JSON.stringify(data.Items));
  }
});
