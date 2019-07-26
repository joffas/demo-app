import Component from '@ember/component';
import { get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject } from '@ember/service';

const classNames = ['flex', 'grow'];

export default Component.extend({

  platform: inject(),
  pdf: inject(),

  classNames,

  isCordova: alias('platform.isCordova'),
  isIE: alias('platform.isIE'),
  isIOs: alias('platform.isIOs'),

  pdfFile: null,
  type: null,
  name: null,

  toPdfName(name) {
    const parts = name.split('.');
    parts.pop();
    parts.push('pdf');
    return parts.join('.');
  },

  didInsertElement() {
    const isCordova = get(this, 'isCordova');
    const isIE = get(this, 'isIE');
    const isIOs = get(this, 'isIOs');

    if (isCordova) {
      const name = this.toPdfName(get(this, 'name'));
      const blob = get(this, 'pdfFile.blob');
      const pdf = get(this, 'pdf');
      pdf.openPdf(name, blob).then(() => {
        history.go(-1);
      });
    } else if (isIE) {
      const blob = get(this, 'pdfFile.blob');
      window.navigator.msSaveOrOpenBlob(blob);
      history.go(-1);
    } else if (isIOs) {
      const pdfUrl = get(this, 'pdfFile.url');
      window.location.replace(pdfUrl);
    }
  }

});
