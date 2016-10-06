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
      })

      // And in case if successful call with no data
      .on('end', function () {
        resolve();
      });

    });

    // Catch errors in creating the request
    req.on('error', function (error) {
      reject(error);
    })

    // Write Data
    if (options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      req.write(querystring.stringify(data || {}));
    }
    else {
      req.write(JSON.stringify(data || {}))
    }

    // Log it
    console.log('Request: ');
    if (req.output && req.output.length > 0) {
      req.output.forEach(function (output) {
        console.log(output);
      })
    }
    else {
      console.log(req._header);
    }

    // Send
    req.end();
  });
}

module.exports = {
  sendRequest: sendRequest
}