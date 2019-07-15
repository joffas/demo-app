import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({

  tagName: '',
  action() {},
  submit: task(function * () {
    yield this.action();
  })

});
