/**
 * App initialization
 */
define([
  'devgrid',
  'modernizr-tests',
  'router',
  'core/_module/views/_moduleView'
], function(
  Devgrid,
  ModernizrTests,
  Router,
  _ModuleView
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
        Router.initialize({pushState: true});

        // Backbone initializations
        new _ModuleView();
      }
    };
  };

  return Init;
});
