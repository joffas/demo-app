import { text } from 'ember-cli-page-object';
import c from './component';

export default function(selector) {
  return c(`${selector} textarea`, {
    label: text(`${selector} label`, { resetScope: true }),
    error: text(`${selector} .paper-input-error`, { resetScope: true })
  });
}
