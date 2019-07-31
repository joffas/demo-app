import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { task, timeout } from 'ember-concurrency';
import { get } from '@ember/object';

export default Route.extend({

  model() {
    const { nome } = this.paramsFor('autenticado.clientes.subrota');
    const buscaReport = get(this, 'buscaReport');
    return buscaReport.perform(nome);
  },

  buscaReport: task(function * (nome) {
    if (nome)
      yield timeout(3000);
    const store = get(this, 'store');
    return yield store.queryRecord('report', { nome });
    //return store.query('pessoa', { nome });
  }).restartable(),

});
