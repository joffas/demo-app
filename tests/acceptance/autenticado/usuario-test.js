import { currentURL } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import page from 'demo-app/tests/pages/inscricao';

module('Acceptance | inscricao.usuario', function(hooks) {
  setupApplicationTest(hooks);

  setupMirage(hooks);

  test('Visitar a rota de incrição do usuário.', async function(assert) {
    await page.visitarInscricaoUsuario();

    assert.equal(currentURL(), page.urlUsuario, 'Exibe a tela de incrição do usuário.');
  });

  test('Inscrever um usuário.', async function(assert) {
    const dados = {
      nome: 'SystemarTeste',
      email: 'teste@systemar.com.br',
      senha: 'systemar2718',
      confirmarSenha: 'systemar2718'
    };

    await page.visitarInscricaoUsuario();

    await page.nome.fill(dados.nome);
    await page.email.fill(dados.email);
    await page.senha.fill(dados.senha);
    await page.confirmarSenha.fill(dados.confirmarSenha);

    await page.inscrever();

    const { schema: { usuarios } } = this.server;
    const usuario = usuarios.first();

    assert.equal(currentURL(), page.urlAposCadastro, 'Exibe a tela após login.');
    assert.equal(usuario.nome, dados.nome, 'Nome correspondente.');
    assert.equal(usuario.email, dados.email, 'Email correspondente.');
    assert.equal(usuario.senha, dados.senha, 'Senha correspondente.');
  });

  test('Campos inválidos impedem o cadastro.', async function(assert) {
    await page.visitarInscricaoUsuario();

    await page.inscrever();

    assert.equal(currentURL(), page.urlUsuario, 'Permanece na tela de inscrição.');
  });
});
