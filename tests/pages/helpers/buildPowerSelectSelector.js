import { buildSelector } from 'ember-cli-page-object';

export default function() {

  return buildSelector(...arguments).replace(/(:eq\([0-9]+\))/gi, (childSelector) => {
    return childSelector.replace(/[0-9]+/g, (number) => {
      return parseInt(number) + 1;
    }).replace(/eq/g, 'nth-of-type');
  });

}
