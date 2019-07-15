import Controller from '@ember/controller';
import { get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  usuario: alias('model'),
  flashMessages: service(),
  toUsuarios() {
    this.transitionToRoute('autenticado.perfil');
  },

  actions: {

    salvar(usuario) {
      usuario.save().then(() => {
        const flashMessages = get(this, 'flashMessages');
        flashMessages.add({ message: 'Operação realizada com sucesso.' });
        this.toUsuarios();
      });
    },

    cancelar() {
      this.toUsuarios();
    }

  }

});
