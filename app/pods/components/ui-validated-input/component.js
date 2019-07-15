import Component from '@ember/component';
import { get, set, defineProperty } from '@ember/object';
import { alias, notEmpty } from '@ember/object/computed';
import { A } from "@ember/array"
import $ from 'jquery';
import or from 'ember-awesome-macros/or';
import computed from 'ember-macro-helpers/computed';
import formatNumber from 'accounting/format-number';
import moment from 'moment';

const { pow } = Math;

export default Component.extend({

  tagName: '',
  property: '',
  changeset: null,
  suffix:'',
  preffix:'',
  precision:2,
  decimal:',',
  thousands:'.',
  allowDecimal:true ,
  type: '',
  dateDisplayFormat: 'DD/MM/YYYY',
  dateValueFormat: 'YYYY-MM-DD',
  useUTC: true,
  hasFocus: false,
  hasValue: or(notEmpty('value'), notEmpty('displayValue')),

  displayValue: computed('value', 'precision', function(value, precision) {
    if ((value != undefined) || (value != null)) {
      var numberReturn = formatNumber(value, precision).toString();
      //numberReturn = numberReturn.replace(/[.]/g, ';').replace(/[,]/g, '.').replace(/[;]/g, ',');
      return numberReturn;
    }
    return '';
  }),

  init() {
    this._super();
    const property = get(this, 'property');
    const type = get(this, 'type');

    if (type === 'date') {
      defineProperty(this, 'value', computed(`changeset.${property}`, 'dateValueFormat', this.getDateValue));
    } else {
      defineProperty(this, 'value', alias('changeset.' + property));
    }
    // defineProperty(this, 'errors', alias('changeset.error.' + property + '.validation'));
  },

  errors: computed('model.errors.[]', 'property', function(errors, property) {
    if (!errors) {
      return A();
    }

    const propertyErrors = errors.errorsFor(property);
    return propertyErrors.mapBy('message');
  }),

  normalizeNumber(number, precision) {
    const cleanValue = number.replace(/[^0-9]/g, '');
    const intValue = parseInt(cleanValue);
    const dividend = pow(10, precision);
    const numberValue = intValue / dividend;
    return numberValue;
  },

  getDateValue(value, format) {
    if (value) {
      // return value.format(format);
      return moment(value).format(format);
    }
  },

  onFocus() {},
  onBlur() {},
  onChange() {},
  onKeyDown() {},

  actions: {
    onKeyDownMoney(e) {
      const { key, srcElement: { selectionStart, selectionEnd } } = e;
      if (key.match(/([0-9]|Enter|Backspace|Home|Back|End|Delete|ArrowRight|ArrowLeft|Tab)/g)) {
        if (selectionStart === selectionEnd) {
          const input = $('input')[0];
          input.selectionStart = input.value.length;
          input.selectionEnd = input.value.length;
        }
      } else {
        e.preventDefault();
      }
    },

    onBlurMoney() {
      set(this, 'hasFocus', false);
    },

    onFocusMoney() {
      set(this, 'hasFocus', true);
    },

    onChangeMoney(number) {
      number = event.target.value;
      const precision = get(this, 'precision');
      const value = this.normalizeNumber(number, precision);
      set(this, 'value', value);
    }
  }

});

