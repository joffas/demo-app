import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validator from 'ember-model-validator/mixins/model-validator';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend(Validator, {

  nome: attr('string'),
  estado: belongsTo('estado'),

  validations: Object.freeze({
    nome: {
      presence: {
        message:'obrigadotorio'
      }
    },
    estado: {
      relations: ['belongsTo'],
      presence: {
        message: 'Por favor, informe um estado'
      }
    }
  })

});
