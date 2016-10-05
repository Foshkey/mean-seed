var comm = require('./comm-service');

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

  return comm.sendRequest(options);
}