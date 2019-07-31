import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { task, timeout } from 'ember-concurrency';
import { get } from '@ember/object';

export default Route.extend({

  queryParams: {
    nome: {
      refreshModel: true
    }
  },

});
