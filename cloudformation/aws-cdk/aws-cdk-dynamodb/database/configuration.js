'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const AWS = require('aws-sdk');

const configuration = {
    load: function () {
        try {
            var filename = path.join(__dirname, 'aws_resource_config.yml'),
                contents = fs.readFileSync(filename, 'utf8'),
                data = yaml.safeLoad(contents);

            //console.log(util.inspect(data, false, 10, true));
            //console.log(data.aws.region);

            return data;
        } catch (err) {
            console.log(err.stack || String(err));
        }
    },

    configureResourceEndpoint: function (awsResource, useLocalEndpoint) {
        if (useLocalEndpoint === true) {
            console.log('using local ' + awsResource);
            awsResource.endpoint =  new AWS.Endpoint('http://localhost:8000');
        }
    }
}

module.exports = configuration;
