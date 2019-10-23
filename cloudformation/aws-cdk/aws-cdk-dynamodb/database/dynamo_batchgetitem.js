'use strict';

const AWS = require('aws-sdk');
const configuration = require('./configuration.js');

const config = configuration.load();
console.log(config);

AWS.config.update({ region: config.aws.region });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  RequestItems: {
    [config.aws.tableName] : {
      Keys: [
        {
          'CUSTOMER_ID': { 'N': '1' },
          'CUSTOMER_NAME': { 'S': 'John Doe' }
        }
      ],
      'ProjectionExpression': 'CUSTOMER_NAME'
    }
  }
};

ddb.batchGetItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    data.Responses.CUSTOMER_LIST.forEach(function(element, index, array) {
      console.log(element);
    });
  }
});
