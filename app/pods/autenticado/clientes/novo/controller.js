import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({

  cliente: alias('model'),
  estados: alias('model.estados'),

  transitionToClientes(){
    this.transitionToRoute('autenticado.clientes.lista');
  },

  actions: {

    salvar(cliente) {
      if (cliente.validate()){
        cliente.save().then(() => {
          this.transitionToClientes();
        });
      }
    },

    cancelar() {
      this.transitionToClientes();
    }

  }

});
