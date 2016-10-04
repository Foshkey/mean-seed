var https = require('https');
var promise = require('promise');
var querystring = require('querystring');
var uuid = require('uuid');

var appConfig = require('./app-config');

// AuthData Constructor Function
function AuthData() {
  this.authenticated = false;
  this.state = uuid.v4();
  this.accessToken = '';
  this.tokenType = '';
  this.expiresIn = 0;
  this.refreshToken = '';
}

// Authenticate Function
function authenticate(authData, authorizationCode, state) {
  return new promise(function (resolve, reject) {

    // Verify state
    if (state !== authData.state) {
      reject('Invalid authentication state id.\nReceived:   ' + state + '\nCurrent id: ' + authData.state);
    }

    // Post Data
    var data = {
      'grant_type': 'authorization_code',
      'code': authorizationCode
    };

    // Options
    var options = {
      host: 'login.eveonline.com',
      path: '/oauth/token',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + appConfig.authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    // Create Request
    var req = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {

        // Verify valid json
        var data;
        try { data = JSON.parse(chunk) }
        catch (e) { reject('Unable to parse chunk\n' + chunk); }

        // Verify access token is filled
        if (data.access_token) {

          // Authenticated
          authData.authenticated = true;
          authData.accessToken = data.access_token;
          authData.tokenType = data.token_type;
          authData.expiresIn = data.expires_in;
          authData.refreshToken = data.refresh_token;
          resolve(authData.accessToken);

        }
        else {
          reject('Could not find access token\n' + chunk);
        }
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
    req.write(querystring.stringify(data));

    // Send
    req.end();
  });
}

module.exports = {
  AuthData: AuthData,
  authenticate: authenticate
}