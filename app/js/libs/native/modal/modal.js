/**
 * Module contains code related to site's modal configuration.
 */
define([
  'jquery',
  'remodal'
], function($, Remodal) {
  var Modal = function() {
    return {
      initialize: function() {

        // Define modal globals
        window.REMODAL_GLOBALS = {
          NAMESPACE: 'modal',
          DEFAULTS: {
            hashTracking: false
          }
        };
      }
    };
  };

  return Modal;
});
