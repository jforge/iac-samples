'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbResource();

var params = {
  RequestItems: {
    [config.aws.dynamodb.tableName] : {
      Keys: [
        {
          'host': { 'S': 'www.things.codes' },
          'uri': { 'S': '/api' }
        }
      ],
      'ProjectionExpression': 'uri'
    }
  }
};

dynamodb.batchGetItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(JSON.stringify(data.Responses));
    data.Responses[config.aws.dynamodb.tableName].forEach(function(element, index, array) {
      console.log(element);
    });
  }
});
