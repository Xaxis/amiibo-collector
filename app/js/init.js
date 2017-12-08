/**
 * App initialization
 */
define([
  'devgrid',
  'modal',
  'router',
  'main'
], function(
  Devgrid,
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
        new Modal().initialize();
        Router.initialize({pushState: true});
        new Main();
      }
    };
  };

  return Init;
});
