import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { authenticateSession } from 'ember-simple-auth/test-support';
import page from 'demo-app/tests/pages/login';

module('Acceptance | login', function(hooks) {

  setupApplicationTest(hooks);

  setupMirage(hooks);

  test('Visitar a tela de login.', async function (assert) {
    await page.visitar();

    assert.equal(currentURL(), page.url);
  });

  test('Realizar o preenchimento dos campos corretamente e conseguir logar-se.', async function (assert) {
    const [ usuario ] = this.server.createList('usuario', 1);

    await page.visitar();
    await page.identificacao.fill(usuario.email);
    await page.senha.fill(usuario.senha);
    await page.confirmar();

    assert.equal(currentURL(), page.urlAposSucesso);
  });

  test('Realizar o preenchimento dos campos incorretamente, não conseguir logar-se, e exibir mensagem de erro.', async function (assert) {
    this.server.create('usuario');

    await page.visitar();
    await page.identificacao.fill('test1@systemar.com.br');
    await page.senha.fill('invalid');
    await page.confirmar();

    assert.equal(currentURL(), page.url);
    assert.equal(page.mensagem, 'Ocorreu um problema com seu email ou sua senha, por favor tente novamente.');
  });

  test('Clicar no botão cadastrar e ser redirecionado para a tela de inscrição.', async function (assert) {
    await page.visitar();
    await page.inscricao();

    assert.equal(currentURL(), page.urlInscricao);
  });

  test('Entrar na rota de login enquanto authenticado redireciona para o aplicativo.', async function(assert) {
    this.server.create('usuario');
    await authenticateSession({ token: 1 });

    await page.visitar();

    assert.equal(currentURL(), page.urlAposSucesso);
  });


});
