import { findElement } from 'ember-cli-page-object';

export default function selector(callback, errorIfMissing = true) {
  return {
    isDescriptor: true,

    get() {
      const $el = findElement(this);

      if (errorIfMissing && !$el.length) {
        throw `Element ${this.scope} not found.`;
      }

      return callback($el);
    }
  };
}
