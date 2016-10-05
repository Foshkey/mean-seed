var appConfig = require('../app-config');
var comm = require('./comm-service');

module.exports = function (postData) {

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

  return comm.sendRequest(options, postData);
}