import { collection } from 'ember-cli-page-object';
import { click } from 'ember-native-dom-helpers';

export function select() {
  return {
    isDescriptor: true,

    get() {
      return async function (value) {
        await click(this.scope);

        const optionsSelector = `md-menu-content md-menu-item button`;
        const options = Array.from(document.querySelectorAll(optionsSelector)) || [];
        const option = options.findBy('innerText', value);
        if (option) {
          return click(option);
        }
      }
    }
  }
}

export function open() {
  return {
    isDescriptor: true,

    get() {
      return function () {
        return click(this.scope);
      }
    }
  }
}

export default function dropdown(selector) {

  return {
    scope: selector,
    select: select(),
    open: open(),
    list: {
      resetScope: true,
      items: collection('md-menu-content md-menu-item')
    }
  }

}
