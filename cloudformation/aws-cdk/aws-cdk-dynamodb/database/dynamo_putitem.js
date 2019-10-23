'use strict';

const AWS = require('aws-sdk');
const configuration = require('./configuration.js');

const config = configuration.load();
console.log(config);

AWS.config.update({ region: config.aws.region });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var params = {
  TableName: config.aws.tableName,
  Item: {
    'CUSTOMER_ID' : {N: '001'},
    'CUSTOMER_NAME' : {S: 'John Doe'}
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
