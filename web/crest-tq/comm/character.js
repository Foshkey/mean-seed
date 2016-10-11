var webRequest = require('../../request');

module.exports = function (accessToken) {

  // Options
  var options = {
      host: 'login.eveonline.com',
      path: '/oauth/verify',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
  };

  return webRequest(options);
}