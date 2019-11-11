'use strict';

const resourceBuilder = require('./aws_resource_builder.js');
const configuration = require('./configuration.js');
const config = configuration.load();

var dynamodb = resourceBuilder.buildDynamoDbDocumentClientResource();

function findRoutingRulesByScan(host, uri) {
  // host from request headers[0].value
  // uri from request uri ("/anyetc")

  let paramsScan = {
    TableName: config.aws.dynamodb.tableName,
  };

  dynamodb.scan(paramsScan).promise()
    .then(function (data) {
      console.log("Success", data.Items);
      data.Items.forEach(function (element, index, array) {
        console.log(JSON.stringify(element));

        if (element.host === host && element.uri == uri) {
          console.log("Match found by scan: " + JSON.stringify(element.redirects));
        };
      });
    }).catch(function (err) {
      console.log(err);
    });

}

function findRoutingRulesByQuery(host, uri) {
  // host from request headers[0].value
  // uri from request uri ("/anyetc")

  let paramsQuery = {
    TableName: config.aws.dynamodb.tableName,
    KeyConditionExpression: 'host = :host and begins_with (uri, :uri)',
    ExpressionAttributeValues: {
      ':host': host,
      ':uri': uri
    }
  }

  //console.log(JSON.stringify(paramsQuery));

  dynamodb.query(paramsQuery).promise()
    .then(function (data) {
      console.log("Match found by query: ", JSON.stringify(data.Items));

      let reducedItem = data.Items.find(e => e.redirects).redirects;
      let defaultRedirect = reducedItem.find(r => r.trigger == "default")
      console.log("redirect entry: " + JSON.stringify(defaultRedirect));

      let redirectTarget = defaultRedirect.setOrigin + defaultRedirect.setURI;
      console.log("redirect target: ", JSON.stringify(redirectTarget));

    }).catch(function (err) {
      console.log(err);
    });

}

findRoutingRulesByScan("test-site.lab.00x.de", "/signin");
findRoutingRulesByQuery("test-site.lab.00x.de", "/signin");
