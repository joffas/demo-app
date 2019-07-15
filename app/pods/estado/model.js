import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validator from 'ember-model-validator/mixins/model-validator';

export default Model.extend(Validator, {

  nome: attr('string'),
  sigla: attr('string')

});
