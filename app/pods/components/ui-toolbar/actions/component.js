import Component from '@ember/component';
import FlexiClasses from 'demo-app/pods/flexi-classes/mixin';
import computed from 'ember-macro-helpers/computed';

export default Component.extend(FlexiClasses, {

  tagName: 'box',
  align: 'center',
  justify: 'center',
  position: 'left',

  classNames: ['ui-toolbar--actions'],
  classNameBindings: ['flexiClasses', 'positionClass'],

  positionClass: computed('position', function(position) {
    return 'ui-toolbar--' + position;
  })

});
