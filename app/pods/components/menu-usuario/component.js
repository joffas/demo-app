import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  tagName: '',
  autenticacao: service(),
  session: service(),

  actions:{

    invalidarSessao() {
      const session = get(this, 'session');
      session.invalidate();
    }

  }

});
