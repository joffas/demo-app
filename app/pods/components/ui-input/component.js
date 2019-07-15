import $ from 'jquery';
import Component from '@ember/component';
import { get, set } from '@ember/object';
import { notEmpty, bool } from '@ember/object/computed';
import computed from 'ember-macro-helpers/computed';
import formatNumber from 'accounting/format-number';
import or from 'ember-awesome-macros/or';

const { pow } = Math;

const MASK_REGEX = {
  '9': /\d/,
  'A': /[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]/,
  '*': /[\dA-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]/
};
const MASK_CHARS = Object.keys(MASK_REGEX);
const PTRN_REGEX = new RegExp('[' + MASK_CHARS.join(',') + ']', 'g');
const ALLOWED_TYPES = ['mask'];

export default Component.extend({

  init(){
    this._super(...arguments);
    this.set( '_mask', { props: {} });
  },

  tagName: '',

  classes: computed('class' , function() {
    const classes = ['flex'];
    classes.push(get(this, 'class'));
    return classes.join(' ');
  }),

  thousands:'.',
  allowDecimal:true ,
  decimal:',',
  suffix:'',
  preffix:'',
  precision:2,
  isDocumento:false,

  type: '',
  dateDisplayFormat: 'DD/MM/YYYY',
  dateValueFormat: 'YYYY-MM-DD',
  useUTC: true,
  hasFocus: false,

  classNames: ['ui-input'],

  hasSuccess: false,
  hasLeftIcon: bool('leftIcon'),
  hasError: bool('errorMessage'),
  hasRightIcon: bool('rightIcon'),
  hasWarning: bool('warningMessage'),
  hasValue: or(notEmpty('value'), notEmpty('displayValue')),

  warningMessage: '',
  errorMessage: '',

  selectAll() {
    const input = $('input')[0];
    input.select();
  },

  displayValue: computed('value', 'precision', function(value, precision) {
    if ((value != undefined) || (value != null)) {
      var numberReturn = formatNumber(value, precision).toString();
      //numberReturn = numberReturn.replace(/[.]/g, ';').replace(/[,]/g, '.').replace(/[;]/g, ',');
      return numberReturn;
    }
    return '';
  }),

  processValue(value, cb) {
    let mask = get(this, 'mask');
    let pattern = mask.replace(PTRN_REGEX, '_');
    let rexps = {};
    mask.split('').forEach(function(c, i) {
      if (~MASK_CHARS.indexOf(c)) {
        rexps[i+1] = MASK_REGEX[c];
      }
    });

    let cursorMax = 0;
    let cursorMin = 0;
    let newValue = '';
    let newValueMasked;
    let nextChar;

    for (let i = 0; i < mask.length; i++) {
      if (~MASK_CHARS.indexOf(mask[i])) {
        cursorMin = i;
        break;
      }
    }

    for (let i = 0, j = 0; i < mask.length;) {
      if (!~MASK_CHARS.indexOf(mask[i])) {
        newValue += mask[i];
        if (mask[i] === value[j]) {
          j++;
        }
        i++;
      } else {
        nextChar = value.substr(j++, 1)
        if (nextChar) {
          if (rexps[newValue.length+1].test(nextChar)) {
            newValue += nextChar;
            cursorMax = newValue.length;
            i++;
          }
        } else {
          newValue = newValue.substr(0, cursorMax);
          if (this._mask.focusing || this._mask.focused) {
            newValueMasked = newValue + pattern.slice(cursorMax);
          }
          break;
        }
      }
    }

    let cursorCurr = 0;
    cursorMax = Math.max(cursorMax, cursorMin);

    if (this._mask.focused) {
      cursorCurr = this.selectionStart;
    } else {
      cursorCurr = cursorMax;
    }

    if (cursorCurr <= cursorMin) {
      cursorCurr = cursorMin;
    } else if (cursorCurr >= cursorMax) {
      cursorCurr = cursorMax;
    } else if (this._mask.cursor > cursorCurr) { //removing
      for (let i = cursorCurr; i >= 0; i--) {
        cursorCurr = i;
        if (rexps[i] && !rexps[i+1]) {
          break;
        }
        if (rexps[i] && rexps[i+1] && rexps[i+1].test(newValue[i])) {
          break;
        }
      }
    } else {
      for (let i = cursorCurr; i <= cursorMax; i++) {
        cursorCurr = i;
        if (!rexps[i+1] && rexps[i]) {
          break;
        }
        if (rexps[i+1] && rexps[i+1].test(newValue[i])) {
          if (!rexps[i]) {
            cursorCurr++;
          }
          break;
        }
      }
    }
    this._mask.value = newValue;
    this._mask.props.value = newValueMasked || newValue;
    this._mask.empty = cursorMax === cursorMin;
    this._mask.cursor = cursorCurr;
    if ((this._mask.focused==false)||(this._mask.focused==undefined) )
      cb(this._mask);
  },

  displayValueMask: computed('value', 'mask', function(value, mask) {
    if ((value != undefined) || (value != null)) {
      if ((mask=='99999999999999')) {
        this.isDocumento = true;
        if (value.length==11)
          mask = '999.999.999-99';
        else if (value.length==12)
          mask = '9999999999-99';
        else if (value.length==13)
          mask = '9999999999999';
        else if (value.length==14)
          mask = '99.999.999/9999-99';
        else
          mask = '99999999999999';
      }
      if (this.validType()) {
        this.processValue(value.toString(), function(mask) {
          value = mask.props.value;
          return mask.props.value;
        });
      }
      return value;
    }
    return '';
  }),

  normalizeNumber(number, precision) {
    const cleanValue = number.replace(/[^0-9]/g, '');
    const intValue = parseInt(cleanValue);
    const dividend = pow(10, precision);
    const numberValue = intValue / dividend;
    return numberValue;
  },

  validType() {
    if (get(this, 'mask') && ALLOWED_TYPES.indexOf(get(this, 'type') || 'text') > -1) {
      return true;
    }
    else {
      return false;
    }
  },

  onFocus() {},
  onBlur() {},
  onChange() {},
  onKeyDown() {},

  actions: {

    onExitMask(event) {
      this._mask.focused = false;
      if ((get(this, 'mask')=='99999999999999')||(this.isDocumento)) {
        this.isDocumento = true;
        if (event.target.value.length==11)
          set(this, 'mask','999.999.999-99');
        else if (event.target.value.length==12)
          set(this, 'mask','9999999999-99');
        else if (event.target.value.length==13)
          set(this, 'mask','9999999999999');
        else if (event.target.value.length==14)
          set(this, 'mask','99.999.999/9999-99');
        else
          set(this, 'mask','99999999999999');
      }
      let value = this.value;
      if (this.validType() && value) {
        this.processValue(value.toString(), function(mask) {
          event.target.value = mask.props.value;
        });
      }
    },

    onEnterMask(event) {
      this._mask.focused = true;
      this._mask.value = this.value;
      event.target.value = event.target.value.replace(/[^0-9A-Za-z]/g, '');
    },

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
