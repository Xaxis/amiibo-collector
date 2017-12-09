/**
 * Require.js initialization
 */
(function(window, require) {

  /**
   * Configure require.js
   */
  require.config({
    baseUrl: 'app/js',
    paths: {

      // Vendor dependencies
      jquery:               'libs/vendor/jquery/dist/jquery.min',
      'jquery.devgrid':     'libs/vendor/jquery.devgrid/dist/jquery.devgrid.min',
      'jquery.sticky':      'libs/vendor/jquery.sticky/dist/jquery.sticky.min',
      'jquery.lazyload':    'libs/vendor/jquery-lazyload/jquery.lazyload',
      text:                 'libs/vendor/requirejs-text/text',
      underscore:           'libs/vendor/underscore/underscore',
      backbone:             'libs/vendor/backbone/backbone',
      'backbone.touch':     'libs/vendor/backbone.touch/dist/backbone.touch.min',
      remodal:              'libs/vendor/remodal/dist/remodal.min',

      // Native modules
      main:                 'core/main/views/mainView',
      util:                 'libs/native/util/util',
      devgrid:              'libs/native/devgrid/devgrid',
      modal:                'libs/native/modal/modal'
    },
    shim: {
      'jquery.devgrid': ['jquery'],
      'jquery.sticky': ['jquery'],
      'jquery.lazyload': ['jquery']
    }
  });

  /**
   * Bootstrap app JavaScript
   */
  require(['init'], function(Init) {
    var app = {
      initialize: function() {

        // Attach device ready event listener when cordova
        // @todo - Fix this initialization!!!
        if ("deviceready" in window) {
          document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        }

        // Initialize application in browser
        else {
          var app = new Init();
          app.initialize();
        }
      },

      // Bind any cordova events here. Common events are:
      // 'pause', 'resume', etc.
      onDeviceReady: function() {
        this.receivedEvent('deviceready');
      },

      // Update DOM on a Received Event
      receivedEvent: function(id) {
        var app = new Init();
        app.initialize();
        console.log('Received Event: ' + id);
      }
    };

    // Initialize cross platform application
    app.initialize();
  });

})(window, require);
