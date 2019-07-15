import { set, get } from '@ember/object';
import Service, { inject as service } from '@ember/service';

export default Service.extend({

  store: service(),
  usuario: null,
  carregarUsuario() {
    const store = get(this, 'store');
    return store.queryRecord('usuario', { me: true }).then((usuario) => {
      set(this, 'usuario', usuario);
      return usuario;
    });
  }

});
