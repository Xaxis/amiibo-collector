/**
 * App initialization
 */
define([
  'devgrid',
  'modernizr-tests',
  'modal',
  'router'
], function(
  Devgrid,
  ModernizrTests,
  Modal,
  Router
) {
  var Init = function() {
    return {

      /**
       * Initialize modules
       */
      initialize: function() {

        // Module initializations
        Devgrid.initialize();
        ModernizrTests.initialize();
        new Modal().initialize();
        Router.initialize({pushState: true});
      }
    };
  };

  return Init;
});
