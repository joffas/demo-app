import Controller from '@ember/controller';
import { get, set } from '@ember/object';
// import { inject as service } from '@ember/service';
// import { task, timeout } from 'ember-concurrency';
import { alias } from '@ember/object/computed';

export default Controller.extend({

  // store: service(),
  pessoas: alias('model.pessoas'),

  nome: '',

  actions:{

    OnClickRelatorio(pessoa, value){
  //     console.log('aqui');
  //     set(this, 'valorPesquisa', value);
  //     const buscaPessoas = get(this, 'buscaPessoas');
  //     buscaPessoas.perform(value);
    },

  }

});
