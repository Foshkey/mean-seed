var promise = require('promise');

var character = require('../comm/character');

var CharData = function () {
  this.CharacterID = 0,
  this.CharacterName = '',
  this.ExpiresOn = '',
  this.Scopes = '',
  this.TokenType = '',
  this.CharacterOwnerHash = '',
  this.IntellectualProperty = ''
}

var getChar = function (req) {
  return new promise(function (resolve, reject) {
    if (req.session.charData) {
      resolve(req.session.charData);
    }
    else {
      character(req.session.authData.accessToken).then(function (charData) {
        // Quick check to ensure char id is there.
        if (charData.CharacterID) {
          req.session.charData = charData;
          resolve(charData);
        }
        else {
          reject('Could not find Character ID');
        }
      }).catch(function (error) {
        reject(error);
      })
    }
  });
}

module.exports = {
  CharData: CharData,
  getChar: getChar
}