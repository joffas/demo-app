import {
  text,
  isVisible
} from 'ember-cli-page-object';
import selector from './selector';

export default function component(scope = '', descriptor = {}) {

  // If a descriptor is passed as the first arg
  if (scope === Object(scope)) {
    descriptor = scope;
    scope      = '';
  } else {
    scope = '.ui-info'+scope;
  }

  return {
    exists:     selector($el => $el.length > 0, false), // false: don't spit an error if element isn't found
    isVisibile: isVisible(),
    titulo:     text('.ui-info--titulo'),
    valor:      text('.ui-info--valor'),

    scope, // inject the scope only if it was provided
    ...descriptor
  };
}
