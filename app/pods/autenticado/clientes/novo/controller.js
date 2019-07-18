import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { set } from '@ember/object';
export default Controller.extend({

  cliente: alias('model.pessoa'),
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
    },

    onChangeEstado(selected) {
      set(this, 'selectedEstado', selected);
      set(this, 'cliente.estado', selected);

      // const mun = get(changeset, 'municipio');
      // if (!(isEmpty(mun.id))) {
      //   set(changeset, 'municipio', '' );
      // }
    }

  }

});
