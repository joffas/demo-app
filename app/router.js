import EmberRouter from '@ember/routing/router';
import config from './config/environment';
//import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

   this.route('login');

   this.route('inscricao');

   this.route('autenticado', { path: '/' }, function() {

     this.route('dashboard', { path: '/' });

     this.route('clientes', function() {
        this.route('lista');
        this.route('report');
        this.route('novo');
        this.route('editar', { path: '/:pessoa_id/editar' });
        this.route('subrota', function() {
          this.route('pesquisa');
          this.route('relatorio');
        });
      });

    this.route('perfil', function() {
        this.route('cargos', { path: '/' });
        this.route('detalhes');
        this.route('editar');
      });

  //   this.mount('sgcweb-administrador', { as: 'administrador', path: '/adm/:administradora_id' });
  //   this.mount('sgcweb-operador', { as: 'operador', path: '/ope' });

   });

});

export default Router;
