let uuid = require('uuid');

let login = require('../comm/login');

// AuthData
class AuthData {
  constructor() {
    this.authenticated = false;
    this.authenticatedAt = false;
    this.state = uuid.v4();
    this.accessToken = '';
    this.tokenType = '';
    this.expiresIn = '';
    this.refreshToken = '';
  }
}

// Authenticate Function
let authenticate = (authData, authorizationCode, state) => {

  // Verify state
  if (state !== authData.state) {
    return promise.reject(`Invalid authentication state id.\nReceived:   ${state}\nCurrent id: ${authData.state}`);
  }

  // Post Data
  let data = {
    'grant_type': 'authorization_code',
    'code': authorizationCode
  };

  return sendAuthRequest(data, authData);

}

let refresh = authData => {

  // Check refresh token
  if (!authData || !authData.refreshToken) {
    return Promise.reject('Refresh token does not exist.');
  }
  
  // Post Data
  let data = {
    'grant_type': 'refresh_token',
    'refresh_token': authData.refreshToken
  };

  return sendAuthRequest(data, authData);

}

let isExpired = authData => {

  let now = new Date();
  let nowTime = now.getTime();
  let expiredTime = authData.authenticatedAt + authData.expiresIn * 1000;

  return nowTime >= expiredTime;
}

let sendAuthRequest = (postData, authData) => {
  return new Promise((resolve, reject) => {

    login(postData).then(resData => {
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
    }).catch(error => {
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