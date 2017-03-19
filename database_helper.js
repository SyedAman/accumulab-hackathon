'use strict';
module.change_code = 1;
var _ = require('lodash');
var SCRYVR_DATA_TABLE_NAME = 'scryvr';
var dynasty = require('dynasty')({});

// var localDynasty = require('dynasty')(localCredentials, localUrl);
// var localUrl = 'http://localhost:8000';
// var localCredentials = {
//   region: 'us-east-1',
//   accessKeyId: 'fake',
//   secretAccessKey: 'fake'
// };
// var localDynasty = require('dynasty')(localCredentials, localUrl);
// var dynasty = localDynasty;

function Scryvr() {}
var scryvrTable = function() {
  return dynasty.table(SCRYVR_DATA_TABLE_NAME);
};

Scryvr.prototype.createScryvrTable = function() {
  return dynasty.describe(SCRYVR_DATA_TABLE_NAME)
    .catch(function(error) {
      return dynasty.create(SCRYVR_DATA_TABLE_NAME, {
        key_schema: {
          hash: ['userId',
           'string']
        }
      });
    });
};

Scryvr.prototype.storeScryvrData = function(userId, scryvrData) {
  return scryvrTable().insert({
    userId: userId,
    data: scryvrData
  }).catch(function(error) {
    console.log(error);
  });
};

Scryvr.prototype.readScryvrData = function(userId) {
  return scryvrTable().find(userId)
    .then(function(result) {
      return result;
    })
    .catch(function(error) {
      console.log(error);
    });
};

module.exports = Scryvr;
