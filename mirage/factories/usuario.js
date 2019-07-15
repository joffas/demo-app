import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({

  nome: () => faker.name.firstName(),
  email: (i) => `test${i+1}@systemar.com.br`,
  senha: 'systemar2718',
  status: () => faker.random.arrayElement(["ativo", "inativo"]),
  imagem: () => faker.image.avatar(),

});
