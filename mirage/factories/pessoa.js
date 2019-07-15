import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({

  nome: () => faker.name.firstName(),
  documento: () => faker.random.number(),
  email: () => faker.internet.email(),
  estadoId: 2

});
