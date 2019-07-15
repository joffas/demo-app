import { currency, number } from "accounting/settings";

export default {

  name: 'accounting',
  initialize: function() {
    currency.symbol = "R$ ";
    currency.decimal = ",";
    currency.thousand = ".";
    number.decimal = ",";
    number.thousand = ".";
  }

};
