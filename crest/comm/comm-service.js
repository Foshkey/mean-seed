var https = require('https');
var promise = require('promise');
var querystring = require('querystring');

function sendRequest(options, data) {
  return new promise(function (resolve, reject) {

    // Create Request
    var req = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {

        // Log it
        console.log('Response:');
        console.log(chunk);

        // Verify valid json
        var resData;
        try { resData = JSON.parse(chunk) }
        catch (e) { reject('Unable to parse chunk\n' + chunk); }

        resolve(resData);
      })

      // Catch errors in response
      .on('error', function (error) {
        reject(error);
      });

    });

    // Catch errors in creating the request
    req.on('error', function (error) {
      reject(error);
    })

    // Write data
    if (data) {
      req.write(querystring.stringify(data));
    }

    // Log it
    req.output.forEach(function (output) {
      console.log('Request: ');
      console.log(output);
    })

    // Send
    req.end();
  });
}

module.exports = {
  sendRequest: sendRequest
}