import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import conditional from 'ember-awesome-macros/conditional';
import eq from 'ember-awesome-macros/eq';
import or from 'ember-awesome-macros/or';

const uiMenu = Component.extend({

  tagName: 'box',
  classNames: ['flexi-fit'],
  onActive() {},
  onOpen() {},
  isOpen: or(eq('elementId', 'currentActive'), eq('elementId', 'currentOpen')),
  expandedClass: conditional('isOpen', raw('expanded'), raw(''))

});

uiMenu.reopenClass({

  positionalParams: ['titulo']

});

export default uiMenu;
