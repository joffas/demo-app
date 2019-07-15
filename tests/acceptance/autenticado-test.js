import { currentURL } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support';
import page from 'demo-app/tests/pages/autenticado';

module('Acceptance | autenticado', function(hooks) {
  setupApplicationTest(hooks);

  setupMirage(hooks);

  test('Visitar a rota Autenticado quando logado, redireciona para a rota do perfil', async function(assert) {
    this.server.create('usuario');
    await authenticateSession({ token: 1 });

    await page.visitar();

    assert.equal(currentURL(), page.urlPerfil);
  });

  test('Visitar a rota Autenticado quando não logado, redireciona para o login', async function(assert) {
    await page.visitar();

    assert.equal(currentURL(), page.urlLogin);
  });
});
