'use strict';
module.change_code = 1;

function CakeBakerHelper(obj) {
  this.started = false;
  this.currentStep = 0;
  this.steps = [
    {
      prompt: 'Initiating Accumulabs Scryvr AI. Say next to get started.'
    },
    {
      prompt: 'If your symptoms occur during EVA, terminate any EVA.'
    },
    {
      prompt: 'Repress as soon as possible.'
    },
    {
      prompt: 'If symptoms resolve, remain in suit.'
    },
    {
      prompt: 'Continue 100 % O2 for 1 hour via umbilical’s to airlock oxygen tank.'
    },
    {
      prompt: 'If symptoms do not resolve, remain in suit at maximum pressure.'
    },
    {
      prompt: 'Breathe 100 % O2 via umbilicals to airlock O2 tank for 2 hours. Consider increasing ambient station pressure to maximu'
    },
    {
      prompt: 'After suit doffing, Limit activity. '
    },
    {
      prompt: 'Push oral fluids, 1 Liter per hour for 2 hours.'
    },
    {
      prompt: 'End of procedure. Scryvr will periodically follow up with you to check on the status of your symptoms.'
    }
  ];

  for (var prop in obj) this[prop] = obj[prop];
}

CakeBakerHelper.prototype.completed = function() {
  return this.currentStep === (this.steps.length - 1);
};

CakeBakerHelper.prototype.getPrompt = function() {
  return this.getStep().prompt;
};

CakeBakerHelper.prototype.getStep = function() {
  return this.steps[this.currentStep];
};

module.exports = CakeBakerHelper;
