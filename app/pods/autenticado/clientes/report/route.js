import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { task, timeout } from 'ember-concurrency';
import { get } from '@ember/object';

export default Route.extend({

  model() {
    const buscaReport = get(this, 'buscaReport');
    return buscaReport.perform();
  },

  buscaReport: task(function * () {
    const store = get(this, 'store');
    var retorno = yield store.findAll('report');
    return get(retorno, 'firstObject');
  }).restartable(),

});
