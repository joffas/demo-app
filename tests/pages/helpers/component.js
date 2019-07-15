import {
  clickable,
  fillable,
  text,
  value,
  isVisible
} from 'ember-cli-page-object';
import selector from './selector';

export default function component(scope = '', descriptor = {}) {

  // If a descriptor is passed as the first arg
  if (scope === Object(scope)) {
    descriptor = scope;
    scope      = '';
  }

  return {
    blur:         selector($el => $el.blur()),
    checked:      selector($el => $el.is(':checked')),
    click:        clickable(),
    disabled:     selector($el => $el.is('[disabled]')),
    exists:       selector($el => $el.length > 0, false), // false: don't spit an error if element isn't found
    fill:         fillable(),
    focus:        selector($el => $el.focus()),
    index:        selector($el => $el.index()),
    isActive:     selector($el => $el.is('.is-active')),
    isExpanded:   selector($el => $el.is('.is-expanded')),
    isError:      selector($el => $el.is('.is-error')),
    isVisibile:   isVisible(),
    text:         text(),
    value:        value(),

    scope, // inject the scope only if it was provided
    ...descriptor
  };
}
