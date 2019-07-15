import LinkComponent from '@ember/routing/link-component';
// import LinkComponent from 'ember-engines/components/link-to-component';

export default LinkComponent.extend({

  tagName: 'box',
  class: '',
  classNames: ['ui-tab'],
  classNameBindings: ['class']

});
