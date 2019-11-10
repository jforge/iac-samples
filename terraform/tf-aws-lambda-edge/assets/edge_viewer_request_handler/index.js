'use strict';

const querystring = require('querystring');

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const params = querystring.parse(request.querystring);

    let useCase001Param = params['uc'];

    if (useCase001Param == "001") {
        /*
        * Generate HTTP redirect response with 302 status code and Location header.
        */
        const response = {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: 'https://signin.immowelt.de',
                }],
            },
        };
        callback(null, response);
    } 

    callback(null, request);
};
