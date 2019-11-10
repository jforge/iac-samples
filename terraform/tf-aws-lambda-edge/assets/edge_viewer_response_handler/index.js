'use strict';

exports.handler = (event, context, callback) => {
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    // set Http response header

    const headerNameSrc = 'X-Amz-Meta-Last-Modified';
    const headerNameDst = 'Last-Modified';
 
    if (headers[headerNameSrc.toLowerCase()]) {
       headers[headerNameDst.toLowerCase()] = [
          headers[headerNameSrc.toLowerCase()][0],
       ];
       console.log(`Response header "${headerNameDst}" was set to ` +
                `"${headers[headerNameDst.toLowerCase()][0].value}"`);
    }
 
    callback(null, response);
 };
