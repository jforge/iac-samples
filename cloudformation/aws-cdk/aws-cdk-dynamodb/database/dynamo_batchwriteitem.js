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
    [config.aws.tableName]: [
       {
         PutRequest: {
           Item: {
             "CUSTOMER_ID": { "N": "002" },
               "CUSTOMER_NAME": { "S": "Richard Roe" },
               "CUSTOMER_NOTES": { "S": "Notes about customer" }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "CUSTOMER_ID": { "N": "003" },
              "CUSTOMER_NAME": { "S": "Freddy Foe" },
              "CUSTOMER_NOTES": { "S": "Notes about customer" }
           }
         }
       }
    ]
  }
};

ddb.batchWriteItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
