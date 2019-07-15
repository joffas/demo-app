import Mirage from 'ember-cli-mirage';
import ENV from 'demo-app/config/environment';

const { Response } = Mirage;

const { APP: { host, namespace } } = ENV;

/*** Utils ***/
function getUsuarioId(request) {
  const { requestHeaders: { Authorization } } = request;
  if (Authorization) {
    const [ , id ] = Authorization.split(' ');
    return id;
  }
  return '';
}

export default function() {

  this.urlPrefix = host;      // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = namespace; // make this `/api`, for example, if your API is namespaced
    // this.timing = 400;       // delay for each request, automatically set to 0 during testing

  this.resource('pessoa');
  this.resource('usuario');
  this.get('/usuarios', function({ usuarios }, request) {
    const { queryParams } = request;
    if (queryParams.me) {
      return usuarios.find(getUsuarioId(request));
    }

    return usuarios.all();
  });

  /*** Estado ***/
  this.get('/estados/:id');
  this.get('/estados');

  /*** Autenticação ***/

  this.post('/token', function({ usuarios }, request) {
    const params = JSON.parse(request.requestBody);
    const resultado = usuarios.where(params);
    if (resultado.length === 1) {
      const { models: [ { id } ] } = resultado;
      return { token: id };
    }

    return new Response(401, {}, {
      error: "...",
      message: "O email ou a senha inseridos estão incorretos."
    });
  });

  /*** Cargo ***/
  this.get('/cargos/:id');
  this.get('/cargos', function({ cargos }, request) {
    const usuarioId = getUsuarioId(request);
    return cargos.where({ usuarioId });
  });


}
