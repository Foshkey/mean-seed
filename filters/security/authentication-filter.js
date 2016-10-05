var promise = require('promise');

var authService = require('../../crest/auth/auth-service');

module.exports = function (req) {
  return new promise(function (resolve, reject) {
    var authData = req.session.authData;
    if (!authData || !authData.authenticated || !authData.accessToken || !authData.refreshToken) {
      reject('Authentication data is not valid');
    }
    if (authService.isExpired(authData)) {
      authService.refresh(authData).then(resolve, reject);
    }
    else {
      resolve();
    }
  });
}