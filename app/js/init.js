/**
 * App initialization
 */
define([
  'devgrid',
  'modernizr-tests',
  'modal',
  'router',
  'main'
], function(
  Devgrid,
  ModernizrTests,
  Modal,
  Router,
  Main
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
        new Main();
      }
    };
  };

  return Init;
});
