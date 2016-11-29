/**
 * Main router module
 */
define([
  'underscore',
  'backbone',
  'main'
], function(
  _,
  Backbone,
  Main
) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'defaultAction',
      '*actions': 'defaultAction'
    }
  });

  var initialize = function() {
    var
      app_router      = new AppRouter;

    // Default route handler
    app_router.on('route:defaultAction', function(actions) {

      // Applicaiton initialization
      new Main(actions);
    });

    // Start history stack
    Backbone.history.start();

    return app_router;
  };

  return {
    initialize: initialize
  }
});
