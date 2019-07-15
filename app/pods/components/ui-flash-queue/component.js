import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({

  tagName: '',

  flashMessages: service(),

  reversedFlashQueue: computed('flashMessages.arrangedQueue.[]', function() {
    const arrangedQueue = get(this, 'flashMessages.arrangedQueue');
    return arrangedQueue.reverse();
  })

});
