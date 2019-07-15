import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({

  alwaysIncludeLinkageData: true,

  keyForAttribute(key) {
    return key;
  },

  keyForRelationship(key) {
    return key;
  }

});
