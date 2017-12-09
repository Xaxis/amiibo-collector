/**
 * Utility module contains misc. useful utilities
 */
define([
  'jquery',
  'underscore'
], function($, _) {
  var Util = function() {
    return {

      /**
       * Returns true if in the Cordova environment
       */
      isCordova: function() {
        return (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1)
      }
    };
  };

  return new Util;
});
