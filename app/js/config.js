/**
 * Require.js initialization
 */
(function(window, require) {

  /**
   * Configure require.js
   */
  require.config({
    baseUrl: 'js',
    paths: {

      // Vendor dependencies
      jquery:               'libs/vendor/jquery/dist/jquery.min',
      'jquery.devgrid':     'libs/vendor/jquery.devgrid/dist/jquery.devgrid.min',
      'jquery.sticky':      'libs/vendor/jquery.sticky/dist/jquery.sticky.min',
      text:                 'libs/vendor/requirejs-text/text',
      underscore:           'libs/vendor/underscore/underscore',
      backbone:             'libs/vendor/backbone/backbone',
      remodal:              'libs/vendor/remodal/dist/remodal.min',

      // Native modules
      main:                 'core/main/views/mainView',
      util:                 'libs/native/util/util',
      devgrid:              'libs/native/devgrid/devgrid',
      'modernizr-tests':    'libs/native/modernizr-tests/modernizr-tests',
      modal:                'libs/native/modal/modal'
    },
    shim: {
      'jquery.eye': ['jquery'],
      'jquery.devgrid': ['jquery'],
      'jquery.sticky': ['jquery']
    }
  });

  /**
   * Bootstrap app JavaScript
   */
  require(['init'], function(Init) {
    var app = new Init();
    app.initialize();
  });

})(window, require);
