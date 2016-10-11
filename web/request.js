var https = require('https');
var parseString = require('xml2js').parseString;
var promise = require('promise');
var querystring = require('querystring');

module.exports = function (options, data) {
  return new promise(function (resolve, reject) {

    // Create Request
    var req = https.request(options, function(res) {

      // Log Status & Headers
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

      res.setEncoding('utf8');
      res.on('data', function (chunk) {

        // Log it
        console.log('BODY:');
        console.log(chunk);

        // First try json
        try {
          resolve(JSON.parse(chunk));
        } catch (jsonError) { 
          // Alright it's not json, try xml
          parseString(chunk, function (xmlError, result) {
            if (!xmlError) {
              resolve(result);
            } else {
              reject(jsonError + ' | ' + xmlError);
            }
          });
        }
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
    if (data) {
      if (options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        req.write(querystring.stringify(data || {}));
      }
      else {
        req.write(JSON.stringify(data || {}))
      }
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

    // Done
    req.end();
  });
}