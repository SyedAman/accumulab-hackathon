'use strict';
module.change_code = 1;

function CakeBakerHelper(obj) {
  this.started = false;
  this.currentStep = 0;
  this.steps = [
    // CakeBakeIntent starts here
    {
      prompt: 'I see that you\'re experiencing joint pain and changes in sensory ability. I believe you have decompression sickness. Please say next so I can walk you through alleviating your symptoms.'
    },
    // advanceStepIntent starts here
    {
      prompt: 'If your symptoms occur during E.V.A, terminate any E.V.A.'
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
      prompt: 'Breathe 100 % O2 via umbilicals to airlock O2 tank for 2 hours. Consider increasing ambient station pressure to maximum'
    },
    {
      prompt: 'After suit doffing, Limit activity. '
    },
    {
      prompt: 'Push oral fluids, 1 Liter per hour for 2 hours.'
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
