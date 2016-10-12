let https = require('https');
let parseString = require('xml2js').parseString;
let querystring = require('querystring');

module.exports = (options, data) => {
  return new Promise((resolve, reject) => {

    // Create Request
    let req = https.request(options, res => {

      // Log Status & Headers
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

      res.setEncoding('utf8');
      res.on('data', chunk => {

        // Log it
        console.log('BODY:');
        console.log(chunk);

        // First try json
        try {
          resolve(JSON.parse(chunk));
        } catch (jsonError) { 
          // Alright it's not json, try xml
          parseString(chunk, (xmlError, result) => {
            if (!xmlError) {
              resolve(result);
            } else {
              reject(jsonError + ' | ' + xmlError);
            }
          });
        }
      })

      // Catch errors in response
      .on('error', error => {
        reject(error);
      })

      // And in case if successful call with no data
      .on('end', () => {
        resolve();
      });

    });

    // Catch errors in creating the request
    req.on('error', error => {
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

    // Done
    req.end();

    // Log it
    console.log('Request: ');
    if (req.output && req.output.length > 0) {
      req.output.forEach(output => {
        console.log(output);
      })
    }
    else {
      console.log(req);
    }
  });
}