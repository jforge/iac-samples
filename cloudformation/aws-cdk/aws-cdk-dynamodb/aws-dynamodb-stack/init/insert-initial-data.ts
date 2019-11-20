'use strict';
import AWS = require('aws-sdk');
import SSM = require('aws-sdk/clients/ssm');

function initialSetup() {
  AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION || 'eu-central-1'
  });

  // retrieve the latest tableName value of the non-secret parameter
  // and store initial data into the table
  getParameterValue('routing_rules_table_name')
    .then(function (tableName) {
      if (!tableName) {
        console.error("tableName cannot be retrieved from Parameter Store");
      } else {
        console.log(tableName);
        storeInitialData(tableName);
      }
    }, function (reason) {
      console.error("error reading parameter from parameters store", reason);
    });
};

function storeInitialData(tableName: string) {
  // create a dynamo db client
  var opts = {
    apiVersion: '2012-08-10'
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient(opts);

  // read content from file and put for each item
  var params = {
    TableName: tableName,
    Item: {
      'host': 'www.things.codes',
      'uri': '/api',
      'redirects': [
        { "selector": "default", "setPath": "/index.html", "setOrigin": "https://api.things.codes" }
      ]
    },
    ConditionExpression: "attribute_not_exists(uri)"
  };

  // Call DynamoDB to add the item to the table
  dynamodb.put(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });

}

async function getParameterValue(parameterName: string) {
  const params = {
    Name: parameterName,
    WithDecryption: false
  };

  const ssm: SSM = new SSM()
  var request = await ssm.getParameter(params).promise();

  let parameterValue;
  if (request && request.Parameter && request.Parameter.Value) {
    parameterValue = request.Parameter.Value;
  }

  return parameterValue;
}

initialSetup();
