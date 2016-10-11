var querystring = require('querystring');

var availableScopes = require('./available-scopes');

// ============================================================
// APP CONFIG
// ============================================================
var clientId = '31389cdc5b8a42ef947a09d18fc24c69';
var secretKey = 'WPuRO2JmN1WcqdRklGRQnWTu7frp1h2cjKXmDqQz';
var redirectUrl = 'http://localhost:3000';
var scope = [
  availableScopes.characterAccountRead,
  availableScopes.remoteClientUI
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
var getEncodedAuthHeader = function () {
  var concatString = clientId + ':' + secretKey;
  return new Buffer(concatString).toString('base64');
}

var getScopeString = function () {
  return scope.join(' ');
}

var genSsoUrl = function (state) {
  var ssoBase = 'https://login.eveonline.com/oauth/authorize';
  var params = {
    response_type: 'code',
    redirect_uri: redirectUrl,
    client_id: clientId,
    scope: getScopeString(),
    state: state
  }
  return ssoBase + '?' + querystring.stringify(params);
}

module.exports = {
  clientId: clientId,
  authHeader: getEncodedAuthHeader(),
  scope: getScopeString(),
  genSsoUrl: genSsoUrl
}