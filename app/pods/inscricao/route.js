import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {

  routeAfterAuthentication: 'autenticado.inicio',
  routeIfAlreadyAuthenticated: 'autenticado.inicio',

  model() {
    return this.store.createRecord('usuario')
  },

  beforeModel(transicao){
     if (transicao.targetName == 'inscricao.inicio') {
       this.transitionTo('inscricao.usuario');
     }
  }

});
