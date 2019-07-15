import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  session: inject(),

  model() {
    return this.store.queryRecord('usuario', { me: true });
  },

  invalidateSession() {
    const session = get(this, 'session');
    session.invalidate();
  },

  actions: {

    invalidateSession() {
      this.invalidateSession();
    }

  }

});
