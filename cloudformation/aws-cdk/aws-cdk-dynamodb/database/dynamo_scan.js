'use strict';

const AWS = require('aws-sdk');
const configuration = require('./configuration.js');

const config = configuration.load();
console.log(config);

AWS.config.update({region: config.aws.region});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

let params = {
  "TableName" : config.aws.tableName
};

ddb.scan(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Items);
    data.Items.forEach(function(element, index, array) {
      console.log(element.CUSTOMER_ID.N + " (" + element.CUSTOMER_NAME.S + ")");
    });
  }
});
