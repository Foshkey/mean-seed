var https = require('https');
var promise = require('promise');
var querystring = require('querystring');

var appConfig = require('./app-config');

function authenticationService() {
  var serv = this;

  serv.authenticated = false;
  serv.accessToken = '';
  serv.refreshToken = '';
  serv.authenticate = function(authorizationCode) {
    return new promise(function (resolve, reject) {
      var data = {
        'grant_type': 'authorization_code',
        'code': authorizationCode
      };
      var options = {
        host: 'login.eveonline.com',
        path: '/oauth/token',
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + appConfig.authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      var req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          var data;
          try { data = JSON.parse(chunk) }
          catch (e) { reject('Unable to parse chunk\n' + data); }
          if (data.access_token) {
            serv.authenticated = true;
            serv.accessToken = data.access_token;
            serv.refreshToken = data.refresh_token;
            resolve(serv.accessToken);
          }
          else {
            reject('Could not find access token\n' + chunk);
          }
        }).on('error', function (error) {
          reject(error);
        });
      });
      req.on('error', function (error) {
        reject(error);
      })
      req.write(querystring.stringify(data));
      req.end();
    });
  }
}

module.exports = new authenticationService();