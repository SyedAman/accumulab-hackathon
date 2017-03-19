'use strict';
module.change_code = 1;
var _ = require('lodash');
var Skill = require('alexa-app');
var SCRYVR_SESSION_KEY = 'scryvr';
var skillService = new Skill.app('scryvr');
var Scryvr = require('./scryvr');
var DatabaseHelper = require('./database_helper');
var databaseHelper = new DatabaseHelper();
skillService.pre = function(request, response, type) {
  databaseHelper.createScryvrTable();
};
var getScryvr = function(scryvrData) {
  if (scryvrData === undefined) {
    scryvrData = {};
  }
  return new Scryvr(scryvrData);
};

var getScryvrFromRequest = function(request) {
  var scryvrData = request.session(SCRVYR_SESSION_KEY);
  return getScryvr(scryvrData);
};

var scryvrIntentFunction = function(scryvr, request, response) {
  console.log(scryvr);
  if (scryvr.completed()) {
    response.say('End of procedure. Scryvr will periodically follow up with you to check on the status of your symptoms.');
    response.shouldEndSession(true);
  } else {
    response.say(Scryvr.getPrompt());
    response.reprompt("I didnt hear you. " + scryvr.getPrompt());
    response.shouldEndSession(false);
  }
  response.session(SCRYVR_SESSION_KEY, scryvr);
  response.send();
};

skillService.intent('advanceStepIntent', {
    'utterances': ['{next|advance|continue}']
  },
  function(request, response) {
    var scryvr = getScryvrFromRequest(request);
    scryvr.currentStep++;
    saveTreatment(scryvr, request);
    scryvrIntentFunction(scryvr, request, response);
  }
);

skillService.launch(function(request, response) {
  var prompt = 'Welcome to Accumulab! To start, say scryvr start the treatment';
  response.say(prompt).shouldEndSession(false);
});

skillService.intent('scryvrIntent', {
    'utterances': ['{start} {the} treatment)']
  },
  function(request, response) {
    var scryvr = new Scryvr({});
    scryvrIntentFunction(scryvr, request, response);
  }
);

skillService.intent('saveTreatmentIntent', {
    'utterances': ['{save} {the|my} treatment']
  },
  function(request, response) {
   var scryvr = getScryvrFromRequest(request);
   saveTreatment(scryvr, request);
   response.say('Treatment progress has been saved!');
   response.shouldEndSession(true).send();
   return false;
  }
);

skillService.intent('loadTreatmentIntent', {
    'utterances': ['{load|resume} {my} {|last} treatment']
  },
  function(request, response) {
    var userId = request.userId;
       databaseHelper.readScryvrData(userId).then(function(result) {
         return (result === undefined ? {} : JSON.parse(result['data']));
       }).then(function(loadedScryvrData) {
         var scryvr = new Scryvr(loadedScryvrData);
         return scryvrIntentFunction(scryvr, request, response);
       });
       return false;
  }
);

var saveTreatment = function(scryvr, request) {
  var userId = request.userId;
  databaseHelper.storeScryvrData(userId, JSON.stringify(scryvr))
    .then(function(result) {
      return result;
    }).catch(function(error) {
      console.log(error);
    });
};

module.exports = skillService;
