import Route from '@ember/routing/route';
import { hash } from 'rsvp';
//import ModelTimeMachine from 'demo-app/utils/model-time-machine';

export default Route.extend({

  model({ pessoa_id }) {
    const pessoa = this.store.findRecord('pessoa', pessoa_id);
    const estados = this.store.findAll('estado');
    const municipios = this.store.findAll('municipio');
    //return pessoa;
    return hash({ pessoa, estados, municipios });
    //return ModelTimeMachine(content);
  },

  setupController(controller, { pessoa }) {
    this._super(...arguments);
    const estado = pessoa.get('municipio.estado');
    controller.set('selectedEstado', estado);
  },

  actions: {

    willTransition() {
      const model = this.modelFor('autenticado.clientes.editar');
      if (model.pessoa.get('hasDirtyAttributes')) {
        model.pessoa.rollbackAttributes();
      }
    }

  }

});
