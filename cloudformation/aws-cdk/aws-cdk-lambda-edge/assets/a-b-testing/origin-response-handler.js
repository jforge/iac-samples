'use strict';
const sourceCoookie = 'X-Source';
const sourceMain = 'main';
const sourceExperiment = 'experiment';
const cookiePath = '/';

// Origin Response handler
exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const requestHeaders = request.headers;
  const response = event.Records[0].cf.response;

  const sourceMainCookie = `${sourceCoookie}=${sourceMain}`;
  const sourceExperimenCookie = `${sourceCoookie}=${sourceExperiment}`;

  // Look for Source cookie
  // A single cookie header entry may contains multiple cookies, so it looks for a partial match
  if (requestHeaders.cookie) {
    for (let i = 0; i < requestHeaders.cookie.length; i++) {
      // ...ugly but simple enough for now
      if (requestHeaders.cookie[i].value.indexOf(sourceExperimenCookie) >= 0) {
        console.log('Experiment Source cookie found');
        setCookie(response, sourceExperimenCookie);
        callback(null, response);
        return;
      }
      if (requestHeaders.cookie[i].value.indexOf(sourceMainCookie) >= 0) {
        console.log('Main Source cookie found');
        setCookie(response, sourceMainCookie);
        callback(null, response);
        return;
      }
    }
  }

  // If request contains no Source cookie, do nothing and forward the response as-is
  console.log('No Source cookie found');
  callback(null, response);
}

// Add set-cookie header (including path)
const setCookie = function (response, cookie) {
  const cookieValue = `${cookie}; Path=${cookiePath}`;
  console.log(`Setting cookie ${cookieValue}`);
  response.headers['set-cookie'] = [{ key: "Set-Cookie", value: cookieValue }];
}
