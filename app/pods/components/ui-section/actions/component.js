import Component from '@ember/component';

export default Component.extend({
  tagName: 'box',
  classNames: ['ui-section--actions', 'flexi-fit', 'align-center'],
  classNameBindings: ['side'],
  side: 'left'
});
