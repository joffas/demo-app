import {
  create,
  clickable,
  text,
  visitable
} from 'ember-cli-page-object';
import input from './helpers/input';

const url = '/login';

export default create({

  url,

  urlAposSucesso: '/',
  urlInscricao: '/inscricao',
  visitar: visitable(url),

  identificacao: input('.identificacao'),
  senha: input('.senha'),

  mensagem: text('.flash-message'),

  confirmar: clickable('.confirmar'),
  inscricao: clickable('.inscricao')

});
