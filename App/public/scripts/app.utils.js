'use strict';
/* eslint no-undef: 0 */
Slickr.utils = {
  log: function(functionName, paramList) {
    var params = paramList || [];
    if (Slickr.env.isCurrentEnv('DEV')) {
      var paramString = params.map(function(item) {
        return typeof item === typeof 'string' ? item : JSON.stringify(item);
      }).join(' ');
      console.log(functionName, 'called with', paramString);
    }
  },
  split: function(toSplit) {
    Slickr.utils.log('split', ['toSplit', toSplit]);
    return toSplit.split(/\W+/g);
  }
};
