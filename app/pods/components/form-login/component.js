import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({

  tagName: '',

  session: service(),
  exceptionHandler: service(),

  autenticar: task(function * (email, senha) {
    try {
      const session = get(this, 'session');
      const authenticator = 'authenticator:token';
      yield session.authenticate(authenticator, { email, senha });
    } catch(e) {
      let exceptionHandler = get(this,'exceptionHandler');
      exceptionHandler.handle(e);
    }
  })

});
