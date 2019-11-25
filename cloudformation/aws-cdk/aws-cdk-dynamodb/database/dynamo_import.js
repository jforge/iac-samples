'use strict';

const AWS = require('aws-sdk');
const configuration = require('./configuration.js');

const config = configuration.load();
console.log(config);

AWS.config.update({ region: config.aws.region });

// Create DynamoDB service object
var dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

// read routing-rules.json
const fs = require('fs');
const path = require('path');

const redirectRules = {
    load: function () {
        try {
            var filename = path.join(__dirname, 'routing-rules.json'),
                contents = fs.readFileSync(filename, 'utf8'),
                data = JSON.parse(contents);
            return data;
        } catch (err) {
            console.log(err.stack || String(err));
        }
    }
}

let rules = redirectRules.load();
console.log(rules);

rules.forEach(obj => {
  Object.entries(obj).forEach(([key, value]) => {
      console.log(`${key} ${value}`);
  });
  putItem(obj);
  console.log('-------------------');
});

// for every element create Item resource and send PutRequests
function putItem(item) {
  var params = {
    TableName: config.aws.dynamodb.tableName,
    Item: item,
    ConditionExpression: "attribute_not_exists(uri)"
  };

  dynamodb.put(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}
