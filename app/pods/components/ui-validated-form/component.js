import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import computed from 'ember-macro-helpers/computed';

export default Component.extend({

  flashMessages: service(),

  tagName: '',
  model: null,
  validateOnly: null,
  validateExcept: null,

  options: computed('validateOnly', 'validateExcept', function(validateOnly, validateExcept) {
    const options = {};
    if (validateOnly) {
      options.only = validateOnly.split(',');
    }
    if (validateExcept) {
      options.except = validateExcept.split(',');
    }
    return options;
  }),

  onSuccess() {},
  onError() {},

  save: task(function * (model, options) {
    if (model.validate(options)) {
      yield this.onSuccess(model);
    } else {
      const flashMessages = get(this, 'flashMessages');
      flashMessages.add({ message: 'Existem campos com problemas, verifique!' });
      yield this.onError();
    }
  })

});
