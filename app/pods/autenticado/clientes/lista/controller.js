import Controller from '@ember/controller';
// import { get, set } from '@ember/object';
// import { inject as service } from '@ember/service';
// import { task, timeout } from 'ember-concurrency';
import { alias } from '@ember/object/computed';

export default Controller.extend({

  // store: service(),
  pessoas: alias('model.pessoas'),

//  queryParams: ['nome'],
  nome: '',

  // buscaPessoas: task(function * (nome) {
  //   yield timeout(300);
  //   const store = get(this, 'store');
  //   const pessoaAttrs = yield store.query('pessoa', { nome });

  //   const pessoaOld = get(this, 'pessoa');
  //   if (!get(pessoaOld, 'isNew')) {
  //     pessoaOld.undoAll();
  //   }

  //   if(pessoaAttrs.get('length') == 1){
  //     set(this, 'pessoa', pessoaAttrs.get('firstObject'));
  //   } else {
  //     set(this, 'pessoa', get(this, 'cleanPessoa'));
  //   }
  //   set(this, 'valorPesquisa', nome);
  // }).restartable(),

  // actions:{

  //   OnChangeBuscaPessoa(pessoa, value){
  //     console.log('aqui');
  //     set(this, 'valorPesquisa', value);
  //     const buscaPessoas = get(this, 'buscaPessoas');
  //     buscaPessoas.perform(value);
  //   },

  // }

});
