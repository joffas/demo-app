import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { htmlSafe } from '@ember/string';

const BASE_DIAMETER = 48;
const DEFAULT_PROGRESS_SIZE = 100;
const DEFAULT_SCALING = 0.5;

const MODE_DETERMINATE = 'determinate',
  MODE_INDETERMINATE = 'indeterminate';


export default Component.extend({

  tagName: 'md-progress-circular',

  classNames: ['centered', 'text-primary'],
  attributeBindings: ['value', 'mode:md-mode', 'circleStyle:style'],

  mode: computed('value', function() {
    var value = this.get('value');
    return isPresent(value) ? MODE_DETERMINATE : MODE_INDETERMINATE;
  }),

  spinnerClass: computed('mode', function() {
    const mode = this.get('mode');

    switch (mode) {
      case MODE_DETERMINATE:
      case MODE_INDETERMINATE:
        return `md-mode-${mode}`;
      default:
        return `ng-hide`;
    }
  }),

  diameter: BASE_DIAMETER,

  clampedValue: computed('value', function() {
    const value = this.get('value');
    return Math.max(0, Math.min(value || 0, 100));
  }),

  circleStyle: computed('diameterRatio', function() {
    return htmlSafe(`transform: scale(${this.get('diameterRatio')})`);
  }),

  gapStyle: computed('clampedValue', function() {
    const value = this.get('clampedValue');
    const borderBottomColor = (value <= 50) ? 'transparent !important' : '',
      transition = (value <= 50) ? '' : 'borderBottomColor 0.1s linear';

    var style = '';

    if (borderBottomColor) {
      style = `border-bottom-color: ${borderBottomColor}; `;
    }

    if (transition) {
      style = style + `transition: ${transition}`;
    }

    return htmlSafe(style);
  }),

  leftStyle: computed('mode', 'clampedValue', function() {
    if (this.get('mode') !== MODE_DETERMINATE) {
      return htmlSafe('');
    }
    const value = this.get('clampedValue');
    const transition = (value <= 50) ? 'transform 0.1s linear' : '';
    const transformDeg = value <= 50 ? 135 : (((value - 50) / 50 * 180) + 135);
    const transform = `rotate(${transformDeg}deg)`;

    var style = '';

    if (transition) {
      style = `transition: ${transition}; `;
    }

    if (transform) {
      style = style + `transform: ${transform}`;
    }

    return htmlSafe(style);
  }),

  rightStyle: computed('mode', 'clampedValue', function() {
    if (this.get('mode') !== MODE_DETERMINATE) {
      return htmlSafe('');
    }
    const value = this.get('clampedValue');
    const transition = (value >= 50) ? 'transform 0.1s linear' : '';
    const transformDeg = value >= 50 ? 45 : (value / 50 * 180 - 135);
    const transform = `rotate(${transformDeg}deg)`;

    var style = '';

    if (transition) {
      style = `transition: ${transition}; `;
    }

    if (transform) {
      style = style + `transform: ${transform}`;
    }

    return htmlSafe(style);
  }),

  diameterRatio: computed('md-diameter', function() {
    if (!this.get('md-diameter')) {
      return DEFAULT_SCALING;
    }

    const match = /([0-9]*)%/.exec(this.get('md-diameter'));
    const value = Math.max(0, (match && match[1] / 100) || parseFloat(this.get('md-diameter')));

    // should return ratio; DEFAULT_PROGRESS_SIZE === 100px is default size
    return (value > 1) ? value / DEFAULT_PROGRESS_SIZE : value;
  })

});
