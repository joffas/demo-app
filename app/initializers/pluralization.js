import Inflector from 'ember-inflector'

export function initialize() {
  var inflector = Inflector.inflector;
  inflector.irregular('administradora', 'administradoras');
  inflector.irregular('assinatura', 'assinaturas');
  inflector.irregular('condominio', 'condominios');
  inflector.irregular('municipio', 'municipios');
  inflector.irregular('endereco', 'enderecos');
  inflector.irregular('usuario', 'usuarios');
  inflector.irregular('plano', 'planos');
  inflector.irregular('conta', 'contas');
  inflector.irregular('conta-bancaria', 'contas-bancarias');
  inflector.irregular('chamada', 'chamadas');
  inflector.irregular('unidade', 'unidades');
  inflector.irregular('banco', 'bancos');
  inflector.irregular('proprietario', 'proprietarios');
  inflector.irregular('inquilino', 'inquilinos');
  inflector.irregular('garagem', 'garagens');
  inflector.irregular('fornecedor', 'fornecedores');
  inflector.irregular('estado', 'estados');
  inflector.irregular('bloco', 'blocos');
  inflector.irregular('ambiente', 'ambientes');
  inflector.irregular('permissao', 'permissoes');
  inflector.irregular('ocorrencia', 'ocorrencias');
  inflector.irregular('nota', 'notas');
  inflector.irregular('despesa', 'despesas');
  inflector.irregular('receita', 'receitas');
  inflector.irregular('relogio', 'relogios');
  inflector.irregular('emissor', 'emissores');
  inflector.irregular('p-ordinario', 'p-ordinarios');
  inflector.irregular('p-ordinario-fonte', 'p-ordinario-fontes');
}

export default {
  name: 'pluralization',
  before: 'ember-cli-mirage',
  initialize
};
