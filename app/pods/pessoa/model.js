import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Validator from 'ember-model-validator/mixins/model-validator';

export default Model.extend(Validator, {

  nome: attr('string'),
  email: attr('string'),
  documento: attr('string'),
  estado: belongsTo('estado'),

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
        message: 'Por favor, informe o e-mail.'
      },
      format: {
        with: /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i,
        message: 'Por favor, insira um e-mail válido'
      }
    },
    documento: {
       presence: {
         message: 'Por favor, informe um CPF ou CNPJ.'
       },
       numericality: {
         message: 'Por favor, insira somente caracteres numéricos.'
       },
       format: {
         with: /(^\d{3}\d{3}\d{3}\d{2}$)|(^\d{2}\d{3}\d{3}\d{4}\d{2}$)/,
         message: 'CPF ou CNPJ inválidos'
       },
       length: {
         minimum: {
           value: 11,
           message: 'Documento deve ter no mínimo 11 digitos.'
         },
         maximum: {
           value: 14,
           message: 'Documento deve ter no máximo 14 digitos.'
         }
       }
     }
  })

});
