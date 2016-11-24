/**
 * App initialization
 */
define([
  'devgrid',
  'modernizr-tests',
  'modal',
  'router',
  'core/main/views/mainView'
], function(
  Devgrid,
  ModernizrTests,
  Modal,
  Router,
  MainView
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
        // Router.initialize({pushState: true});

        // Backbone initializations
        new MainView();
      }
    };
  };

  return Init;
});
