'use strict';

const aws = require('aws-sdk');
const configuration = require('./configuration.js');

const config = configuration.load();
console.log(config);

module.exports = {};

module.exports.buildDynamoDbResource = function(opts) {

    aws.config.update({
        region: config.aws.region 
        // region: opts.region || process.env.AWS_DEFAULT_REGION || 'us-east-1'
        // accessKeyId: opts.key || process.env.AWS_ACCESS_KEY_ID,
        // secretAccessKey: opts.secret || process.env.AWS_SECRET_ACCESS_KEY,
        // sessionToken: opts.session || process.env.AWS_SESSION_TOKEN,
    });

    var opts = {
        apiVersion: '2012-08-10'
    };

    if (config.useLocalEndpoint === true) {
        opts.endpoint = new aws.Endpoint(config.local.url);
        console.log('using local endpoint for aws resource: ' + JSON.stringify(opts));
    }

    // if (process.env.AWS_DYNAMODB_ENDPOINT){
    //     opts.endpoint = new aws.Endpoint(process.env.AWS_DYNAMODB_ENDPOINT);
    // }
    
    return new aws.DynamoDB(opts);
};

module.exports.buildDynamoDbDocumentClientResource = function(opts) {

    aws.config.update({
        region: config.aws.region 
        // region: opts.region || process.env.AWS_DEFAULT_REGION || 'us-east-1'
        // accessKeyId: opts.key || process.env.AWS_ACCESS_KEY_ID,
        // secretAccessKey: opts.secret || process.env.AWS_SECRET_ACCESS_KEY,
        // sessionToken: opts.session || process.env.AWS_SESSION_TOKEN,
    });

    var opts = {
        apiVersion: '2012-08-10'
    };

    if (config.useLocalEndpoint === true) {
        opts.endpoint = new aws.Endpoint(config.local.url);
        console.log('using local endpoint for aws resource: ' + JSON.stringify(opts));
    }
    
    return new aws.DynamoDB.DocumentClient(opts);
};
