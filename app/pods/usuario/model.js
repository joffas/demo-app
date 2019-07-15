import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validator from 'ember-model-validator/mixins/model-validator';
// import { hasMany } from 'ember-data/relationships';

export default Model.extend(Validator, {

  nome: attr('string'),
  email: attr('string'),
  senha: attr('string'),
  confirmarSenha: attr('string'),
  status: attr('string'),
  imagem: attr('string'),

  //permissoes: hasMany('permissao'),

  validations: Object.freeze({
    nome: {
      presence: {
        message: 'Por favor, informe um nome.'
      },
      length: {
        minimum: {
          value: 3,
          message: 'Por favor, Informe no minímo 3 caracteres'
        }
      }
    },
    email: {
      presence: {
        message: 'Por favor, informe um e-mail.'
      },
      format: {
        with: /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i,
        message: 'Por favor, insira um e-mail válido'
      }
    },
    senha: {
      presence: {
        message: 'Por favor, informe uma senha.'
      },
      length: {
        minimum: {
          value: 6,
          message: 'Por favor, Informe no minímo 6 caracteres para a senha'
        }
      }
    },
    confirmarSenha: {
      presence: {
        message: 'Por favor, confirme sua senha.'
      },
      match: {
        attr: 'senha',
        message: 'As senhas precisam ser iguais'
      }
    }

  })

});
