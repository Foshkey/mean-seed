var promise = require('promise');
var uuid = require('uuid');

var login = require('../comm/login');

// AuthData Constructor Function
function AuthData() {
  this.authenticated = false;
  this.authenticatedAt;
  this.state = uuid.v4();
  this.accessToken;
  this.tokenType;
  this.expiresIn;
  this.refreshToken;
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

    sendAuthRequest(data, authData).then(resolve, reject);

  });
}

function refresh(authData) {
  return new promise(function (resolve, reject) {

    // Check refresh token
    if (!authData.refreshToken) {
      reject('Refresh token does not exist.');
    }
    
    // Post Data
    var data = {
      'grant_type': 'refresh_token',
      'refresh_token': authData.refreshToken
    };

    sendAuthRequest(data, authData).then(resolve, reject);

  });
}

function isExpired(authData) {

  var now = new Date();
  var nowTime = now.getTime();
  var expiredTime = authData.authenticatedAt + authData.expiresIn * 1000;

  return nowTime >= expiredTime;
}

function sendAuthRequest(postData, authData) {
  return new promise(function (resolve, reject) {

    login(postData).then(function (resData) {
      // Verify access token is filled
      if (resData.access_token) {

        // Authenticated
        authData.authenticated = true;
        authData.authenticatedAt = (new Date()).getTime();
        authData.accessToken = resData.access_token;
        authData.tokenType = resData.token_type;
        authData.expiresIn = resData.expires_in;
        authData.refreshToken = resData.refresh_token;
        resolve(authData.accessToken);
      }
      else {
        reject('Access token could not be found');
      }
    }).catch(function (error) {
      reject(error);
    })

  });
}

module.exports = {
  AuthData: AuthData,
  authenticate: authenticate,
  refresh: refresh,
  isExpired: isExpired
}