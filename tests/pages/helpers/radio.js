import $ from 'jquery';
import { text, collection } from 'ember-cli-page-object';

export function select() {
  return {
    isDescriptor: true,

    get() {
      return function (value) {
        let options = `md-radio-button:has(.md-label:has(span:contains(${value})))`;
        let fullSelector = this.scope+' '+options;
        return $(fullSelector).click();
      }
    }
  }
}

export default function radio(scope) {

  return {
    scope,
    value: text(`md-radio-button.md-checked .md-label span`),
    select: select(),
    items: collection('md-radio-group md-radio-button', {
      resetScope: true
    })
  }

}

