import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { task, timeout } from 'ember-concurrency';
import { get } from '@ember/object';

export default Route.extend({

  model() {
    //const pessoas = this.store.query('pessoa', { nome });
    const { nome } = this.paramsFor('autenticado.clientes.subrota');
    const buscaPessoas = get(this, 'buscaPessoas');
    return hash({ pessoas: buscaPessoas.perform(nome) });
  },

  buscaPessoas: task(function * (nome) {
    if (nome)
      yield timeout(500);
    const store = get(this, 'store');
    return store.query('pessoa', { nome });
  }).restartable(),

});
