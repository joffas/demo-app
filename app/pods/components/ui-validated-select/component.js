import Component from '@ember/component';
import { get, defineProperty } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({

  tagName: '',
  changeset: null,
  property: '',
  init() {
    this._super();
    const property = get(this, 'property');
    defineProperty(this, 'selected', alias('changeset.' + property));
    defineProperty(this, 'errors', alias('changeset.error.' + property + '.validation'));
  },

  onChange() {},
});
