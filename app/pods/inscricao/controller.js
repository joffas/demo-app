import Controller from '@ember/controller';
import { get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  usuario: alias('model'),
  session: service(),
  flashMessages: service(),
  exceptionHandler: service(),

  actions: {

    inscrever(usuario){

      // let flashMessages = get(this, 'flashMessages');
      // let message = 'Senha incorreta';
      // flashMessages.add({message});
      //this.pushErrorsToChangeset(exception, changeset);

      usuario.save().then((usuario) => {
        const email = get(usuario, 'email');
        const senha = get(usuario, 'senha');
        const authenticator = 'authenticator:token';
        const session = get(this, 'session');
        session.authenticate(authenticator, { email, senha }).then(
          () => {
            this.transitionToRoute('autenticado');
          },
          (e) => {
            let exceptionHandler = get(this,'exceptionHandler');
            exceptionHandler.handle(e);
          }
        );
      });
    }

  }

});
