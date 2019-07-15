import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.modelFor('autenticado.perfil');
  },

  actions: {

    willTransition() {
      const usuario = this.modelFor('autenticado.perfil.editar');
      usuario.rollbackAttributes();
    }

  }

});
