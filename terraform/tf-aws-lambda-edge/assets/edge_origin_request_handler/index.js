
'use strict';

const zlib = require('zlib');

const content = `
<\!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Lambda@Edge Static Content Response</title>
  </head>
  <body>
    <p>Hello from Lambda@Edge!</p>
  </body>
</html>
`;

exports.handler = (event, context, callback) => {
    /*
     * Generate HTTP OK response using 200 status code with a gzip compressed content HTML body.
     */
    const buffer = zlib.gzipSync(content); 
    const base64EncodedBody = buffer.toString('base64');
    
    var response = {
        headers: {
            'content-type': [{key:'Content-Type', value: 'text/html; charset=utf-8'}],
            'content-encoding' : [{key:'Content-Encoding', value: 'gzip'}]
         },
        body: base64EncodedBody,
        bodyEncoding: 'base64',
        status: '200',
        statusDescription: "OK"
     }
     
    callback(null, response);
};