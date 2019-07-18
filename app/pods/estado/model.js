import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validator from 'ember-model-validator/mixins/model-validator';
import { hasMany } from 'ember-data/relationships';

export default Model.extend(Validator, {

  nome: attr('string'),
  sigla: attr('string'),
  municipios: hasMany('municipio')

});
