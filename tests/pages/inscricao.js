import {
  create,
  clickable,
  visitable
} from 'ember-cli-page-object';
import input from './helpers/input';

const url = '/inscricao';
const urlLogin = `/login`;
const urlUsuario = `/inscricao`;
const urlAposCadastro = `/`;

export default create({

  url,
  urlLogin,
  urlUsuario,
  urlAposCadastro,

  // Visitar
  visitarInscricao: visitable(url),
  visitarInscricaoUsuario: visitable(urlUsuario),

  // Atributos
  nome: input('.nome'),
  email: input('.email'),
  senha: input('.senha'),
  confirmarSenha: input('.confirmar-senha'),

  // Ações
  irParaLogin: clickable('.login'),
  inscrever: clickable('.inscrever'),

});
