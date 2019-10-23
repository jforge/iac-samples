'use strict';

const AWS = require('aws-sdk');
const configuration = require('./configuration.js');

const config = configuration.load();
console.log(config);

AWS.config.update({ region: config.aws.region });

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
  ExpressionAttributeValues: {
    ':i': 3,
    ':name': 'F',
    ':notes': 'bout'
   },
 KeyConditionExpression: 'CUSTOMER_ID = :i and begins_with (CUSTOMER_NAME, :name)',
 FilterExpression: 'contains (CUSTOMER_NOTES, :notes)',
 TableName: config.aws.tableName
};

docClient.query(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Items);
  }
});
