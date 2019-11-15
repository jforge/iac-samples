'use strict';
exports.handler = (event, context, callback) => {
  /*
   * Generate HTTP redirect response with 302 status code and Location header.
   */
  const response = {
    status: '301',
    statusDescription: 'Moved Permanently',
    headers: {
      location: [{
        key: 'Location',
        value: 'http://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html',
      }],
    },
  };
  callback(null, response);
};
