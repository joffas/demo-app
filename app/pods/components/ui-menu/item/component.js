import { get } from '@ember/object';
import { alias } from '@ember/object/computed';
import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({

  tagName: 'div',
  classNames: ['ui-menu-item', 'flexi-fit'],

  titulo: alias('linkTitle'),

  onActive() {},

  didRender() {
    this._super(...arguments);
    const active = get(this, 'active');
    if (active) {
      const elementId = get(this, 'elementId');
      this.onActive(elementId);
    }
  }

});
