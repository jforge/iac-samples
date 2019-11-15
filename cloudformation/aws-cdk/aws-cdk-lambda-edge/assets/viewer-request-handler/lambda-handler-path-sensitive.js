'use strict';
exports.handler = (event, context, callback) => {
  /*
   * Generate HTTP redirect response with 301 status code and Location header.
   */

   const request = event.Records[0].cf.request;

   // get the original URL path
   const path = request.uri
   const baseURI = 'https://www.lab.00x.de'

   // construct the response
   const response = {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
          location: [{
              key: 'Location',
              value: baseURI,
          }],
      },
  };

  // Configure the URL redirects
  switch(path) {
    case '/path/to/old/resource':
      response.headers.location[0].value = baseURI + '/path/to/new/resource';
    break;
    case '/rinse/and/repeat':
      response.headers.location[0].value = baseURI + '/path/to/new/resource';
    break;
    default:
      response.headers.location[0].value = baseURI;
   }

  callback(null, response);
};
