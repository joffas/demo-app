import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({

  nome: attr('string'),
  tipo: attr('string'),
  recurso_id: attr('string')

});
