import {
  create,
  visitable,
  clickable
} from 'ember-cli-page-object';

const url = '/';

export default create({

  url,

  urlPerfil: `/`,
  urlCondominios: `/condominios`,
  urlPermissoes: `/permissoes`,
  urlLogin: '/login',
  urlSair: '/',

  visitar: visitable(url),

  inicio: clickable('.menu .inicio button'),
  condominios: clickable('.menu .condominios button'),
  permissoes: clickable('.menu .permissoes button'),
  sair: clickable('.menu .sair button')

});
