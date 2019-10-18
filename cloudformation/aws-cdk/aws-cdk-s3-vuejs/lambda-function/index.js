const AWS = require("aws-sdk");

module.exports.index = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ message: "Hello World" })
  });
};
