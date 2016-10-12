let querystring = require('querystring');

let availableScopes = require('./available-scopes');

// ============================================================
// APP CONFIG
// ============================================================
let clientId = '31389cdc5b8a42ef947a09d18fc24c69';
let secretKey = 'WPuRO2JmN1WcqdRklGRQnWTu7frp1h2cjKXmDqQz';
let redirectUrl = 'http://localhost:3000';
let scope = [
  availableScopes.characterAccountRead,
  availableScopes.remoteClientUI
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
let getEncodedAuthHeader = () => {
  let concatString = `${clientId}:${secretKey}`;
  return new Buffer(concatString).toString('base64');
}

let getScopeString = () => {
  return scope.join(' ');
}

let genSsoUrl = state => {
  let ssoBase = 'https://login.eveonline.com/oauth/authorize';
  let params = {
    response_type: 'code',
    redirect_uri: redirectUrl,
    client_id: clientId,
    scope: getScopeString(),
    state: state
  }
  return `${ssoBase}?${querystring.stringify(params)}`;
}

module.exports = {
  clientId: clientId,
  authHeader: getEncodedAuthHeader(),
  scope: getScopeString(),
  genSsoUrl: genSsoUrl
}