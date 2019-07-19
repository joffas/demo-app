import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { set, get } from '@ember/object';
import computed from 'ember-macro-helpers/computed';
export default Controller.extend({

  cliente: alias('model.pessoa'),
  estados: alias('model.estados'),
  selectedEstado: '',
  selectedMunicipio: '',

  municipios: computed('selectedEstado', 'cliente.municipio.estado', function(selectedEstado, munEstado){
    if (!selectedEstado){
      selectedEstado = munEstado;
    }

    if (selectedEstado){
      const municipios = get(selectedEstado, 'municipios');
      return municipios;
    }else {
      return Promise.resolve();
    }
  }),

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
    },

    onChangeMunicipio(selected) {
      set(this, 'selectedMunicipio', selected);
      set(this, 'cliente.municipio', selected);
      set(this, 'cliente.estado', selected.estado);
      // const mun = get(selected, 'municipio');
      // if (!(isEmpty(mun.id))) {
    }

  }

});
