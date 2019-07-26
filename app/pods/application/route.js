import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {

  flashMessages: service(),
  routeAfterAuthentication: 'autenticado',

  actions: {
     error({ errors }) {
       console.log('entrou aqui',errors);
       const flashMessages = get(this, 'flashMessages');
       flashMessages.add({ message: errors[0].detail });

       return true;
     }
  }

});
