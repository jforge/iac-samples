'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbDocumentClientResource();

let params = {
  TableName: config.aws.dynamodb.tableName,
};

dynamodb.scan(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Items);
    data.Items.forEach(function(element, index, array) {
      console.log(JSON.stringify(element));
    });
  }
});

