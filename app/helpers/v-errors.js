import Helper from '@ember/component/helper';
import { set, observer } from '@ember/object';
import { A } from '@ember/array';

export default Helper.extend({

  compute([errors, property]) {
    set(this, 'errors', errors);
    if (!errors) {
      return A();
    }

    const propertyErrors = errors.errorsFor(property);
    return propertyErrors.mapBy('message')[0];
  },

  didChange: observer('errors.[]', function() {
    this.recompute();
  })

});
