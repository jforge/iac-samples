'use strict';

const AWS = require('aws-sdk');
const configuration = require('./configuration.js');

const config = configuration.load();
console.log(config);

AWS.config.update({ region: config.aws.region });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// TODO read routing-rules.json
// TODO for every element create Item resource and send PutRequests

var params = {
  RequestItems: {
    [config.aws.tableName]: [
       {
         PutRequest: {
           Item: {

           }
         }
       },
       {
         PutRequest: {
           Item: {

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
