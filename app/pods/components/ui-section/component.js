import Component from '@ember/component';

const uiSection = Component.extend({

  tagName: 'hbox',
  nome: 'nome?',
  classNames: ['ui-section', 'flexi-fit'],
  classNameBindings: ['nome', 'compact:ui-section--compact']

});

uiSection.reopenClass({

  positionalParams: ['nome']

});

export default uiSection;
