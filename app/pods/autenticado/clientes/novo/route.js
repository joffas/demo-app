import Route from '@ember/routing/route';
//import ModelTimeMachine from 'demo-app/utils/model-time-machine';

export default Route.extend({

  model() {
    return this.store.createRecord('pessoa');
    //return ModelTimeMachine(content);
  },

  actions: {

    willTransition() {
      const model = this.modelFor('autenticado.clientes.novo');
      if (model.get('isNew')) {
        model.deleteRecord();
      }
    }

  }

});
