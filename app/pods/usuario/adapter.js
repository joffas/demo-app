import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({

  urlForQueryRecord(query) {
    if (query.me) {
      delete query.me;
      const urlPrefix = this.buildURL();
      return `${urlPrefix}/me`;
    }

    return this._super(...arguments);
  }

});
