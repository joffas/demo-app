import Route from '@ember/routing/route';
import { hash } from 'rsvp';
//import ModelTimeMachine from 'demo-app/utils/model-time-machine';

export default Route.extend({

  model() {
    const pessoa = this.store.createRecord('pessoa');
    const estados = this.store.findAll('estado');
    return hash({ pessoa, estados });
    //return ModelTimeMachine(content);
  },

  actions: {

    willTransition() {
      const model = this.modelFor('autenticado.clientes.novo');
      if (model.pessoa.get('isNew')) {
        model.pessoa.deleteRecord();
      }
    }

  }

});
