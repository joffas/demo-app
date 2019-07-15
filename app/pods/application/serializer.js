import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({

  keyForAttribute(key){
    return key;
  },

  keyForRelationship(key){
    return key;
  },

  getInclude(snapshot) {
    if (snapshot && snapshot.adapterOptions && snapshot.adapterOptions.include) {
      const { adapterOptions: { include } } = snapshot;
      return include.split(',').map((prop) => prop.trim());
    }

    return [];
  },

  getSubInclude(snapshot, relKey) {
    const include = this.getInclude(snapshot);
    const subIncludes = include.reduce((result, rel) => {
      const [ rootPart, ...parts ] = rel.split('.');
      if (rootPart === relKey && parts.length) {
        result.push(parts.join('.'));
      }
      return result;
    }, []);

    return subIncludes.join(',');
  },

  shouldInclude(snapshot, relKey) {
    const include = this.getInclude(snapshot);
    return include.indexOf(relKey) >= 0;
  },

  serializeRelationship(snapshot, data, rel) {
    const relKind = rel.kind;
    const relKey = rel.key;

    if (data && this.shouldInclude(snapshot, relKey)) {

      data.relationships = data.relationships || {};
      const key = this.keyForRelationship(relKey, relKind, 'serialize');
      data.relationships[key] = data.relationships[key] || {};

      const subInclude = this.getSubInclude(snapshot, relKey);

      if (relKind === "belongsTo") {
        const { id } = data.relationships[key].data;
        const record = snapshot.belongsTo(relKey);
        record.adapterOptions = { include: subInclude };
        const serializedRecord = this.serializeRecord(record);
        data.relationships[key].data = { id, ...serializedRecord };
      }

      if (relKind === "hasMany" && typeof(snapshot.hasMany(relKey)) !== "undefined") {
        const serialize = this.serializeRecord.bind(this);
        data.relationships[key].data = snapshot.hasMany(relKey).map((item) => {
          const { id } = item;
          item.adapterOptions = { include: subInclude };
          const serializedRecord = serialize(item);
          return { id, ...serializedRecord };
        });
      }

    }

  },

  serializeRecord(obj) {
    if (!obj) {
      return null;
    }

    const serialized = obj.serialize({__isSaveRelationshipsMixinCallback: true});

    if (serialized.data.relationships === {})
    {
      delete serialized.data.relationships;
    }

    return serialized.data;

  },

  serializeHasMany() {
    this._super(...arguments);
    this.serializeRelationship(...arguments);
  },

  serializeBelongsTo() {
    this._super(...arguments);
    this.serializeRelationship(...arguments);
  }

});
