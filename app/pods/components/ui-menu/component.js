import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['ui-menu'],

  actions: {
    onActive(element) {
      set(this, 'currentActive', element);
      return element;
    },
    onOpen(element) {
      set(this, 'currentOpen', element);
      return element;
    }

  }

})
