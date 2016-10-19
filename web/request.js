let https = require('https');
let parseString = require('xml2js').parseString;
let querystring = require('querystring');

let logger = require('../logger');

module.exports = (options, data) => {
  return new Promise((resolve, reject) => {

    // Create Request
    let req = https.request(options, res => {

      // Log Status & Headers
      logger.debug(`Status: ${res.statusCode}`);
      logger.debug(`Headers: ${JSON.stringify(res.headers)}`);

      res.setEncoding('utf8');
      res.on('data', chunk => {

        // Log it
        logger.debug(`BODY: ${chunk}`);

        // First try json
        try {
          logger.debug('Attempting JSON...');
          resolve(JSON.parse(chunk));
          logger.debug('Success');
        } catch (jsonError) {
          // Alright it's not json, try xml
          logger.debug('Attempting XML...');
          parseString(chunk, (xmlError, result) => {
            if (!xmlError) {
              logger.debug('Success');
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
        logger.debug('Done');
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
    logger.info(`${options.method} ${options.host}${options.path}`, { output: req.output });
  });
}