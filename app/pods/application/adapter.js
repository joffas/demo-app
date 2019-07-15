import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from 'demo-app/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

const { APP: { host, namespace } } = ENV;

export default JSONAPIAdapter.extend(DataAdapterMixin, TokenAuthorizerMixin, {

  host,
  namespace

});
