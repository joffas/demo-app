import Component from '@ember/component';
import FlexiClasses from 'demo-app/pods/flexi-classes/mixin';

export default Component.extend(FlexiClasses, {

  tagName: 'hbox',
  align: 'center',
  classNames: ['ui-toolbar--content'],
  classNameBindings: ['class', 'flexiClasses']

});
