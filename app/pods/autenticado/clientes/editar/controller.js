import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { set, get } from '@ember/object';
import computed from 'ember-macro-helpers/computed';
import { inject as service } from '@ember/service';
//import { isEmpty } from '@ember/utils';

export default Controller.extend({

  flashMessages: service(),
  cliente: alias('model.pessoa'),
  estados: alias('model.estados'),
//  municipios: alias('model.municipios'),

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
        })
        .catch(error => {
          const flashMessages = get(this, 'flashMessages');
          flashMessages.add({ message: error.errors[0].detail });
          this.transitionToClientes();
        });
      }
    },

    excluir(cliente) {
      cliente.destroyRecord().
      then(() => {
        this.transitionToClientes();
      })
      .catch(error => {
        const flashMessages = get(this, 'flashMessages');
        flashMessages.add({ message: error.errors[0].detail });
        this.transitionToClientes();
      });
    },

    cancelar() {
      this.transitionToClientes();
    },

  // buscaCep: task(function * (changeset) {
  //   let cep = get(changeset, 'cep');
  //   try {
  //     let endereco = yield this.get('store').queryRecord('endereco', {cep: cep});
  //     let municipio = yield get(endereco,'municipio');
  //     let estado = yield get(municipio,'estado');

  //     let logradouro = get(endereco,'logradouro');
  //     let numero = get(endereco,'numero');
  //     let complemento = get(endereco,'complemento');
  //     let bairro = get(endereco,'bairro');

  //     if (logradouro)
  //       set(changeset, 'logradouro', logradouro);
  //     if (numero)
  //       set(changeset, 'numero', numero);
  //     if (complemento)
  //       set(changeset, 'complemento', complemento);
  //     if (bairro)
  //       set(changeset, 'bairro', bairro);
  //     if (estado) {
  //       set(this, 'selectedEstado', estado);
  //       set(changeset, 'estado', estado);
  //     }
  //     if (municipio)
  //       set(changeset, 'municipio', municipio);
  //   } catch(e) {
  //     let exceptionHandler = get(this,'exceptionHandler');
  //     exceptionHandler.handle(e);
  //   }
  // }).drop(),

    onChangeEstado(selected) {
      set(this, 'selectedEstado', selected);
      set(this, 'cliente.estado', selected);
      set(this, 'cliente.municipio', '' );
      //set(selected, 'municipio', '' );
      // const mun = get(selected, 'municipio');
      // if (!(isEmpty(mun.id))) {

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
