'use strict';

module.exports = function(environment) {
  process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] = 'https\\://services.gradle.org/distributions/gradle-5.1.1-all.zip';
  let isCordova = process.env.CORBER;

  let rootURL = (isCordova) ? '' : '/';
  let locationType = (isCordova) ? 'hash' : 'auto';

  let ENV = {
    modulePrefix: 'demo-app',
    podModulePrefix: 'demo-app/pods',
    environment,
    rootURL,
    locationType,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      host: 'http://192.168.0.7:3000',
      //host: 'https://api-node-demo.herokuapp.com',
      namespace: 'v1'
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'connect-src': "http://192.168.0.7:3000"
      //'connect-src': 'https://api-node-demo.herokuapp.com'
    },

    'ember-cli-mirage': {
      enabled: false
    },

    'flashMessageDefaults': {
      timeout: 2500,
      extendedTimeout: 375,
      sticky: false,
      preventDuplicates: true
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV['ember-cli-mirage'].enabled = false;
    ENV['flashMessageDefaults'].sticky = true;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature

    // ENV['ember-cli-mirage'].enabled = false;
  }

  // if (ENV['ember-cli-mirage'].enabled) {
  //   ENV.APP.host = '';
  // }

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: [ENV.APP.host,ENV.APP.namespace,'token'].filter((s) => s).join('/')
  }

  return ENV;
};
