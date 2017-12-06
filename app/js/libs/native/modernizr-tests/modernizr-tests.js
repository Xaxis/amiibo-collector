/**
 * Module contains code related to performing additional/custom Modernizr tests.
 * - @todo - Modernizr currently can't be loaded via requirejs and is presently being loaded via a CDN. Monitor the
 * development of a requirejs/modernizr shim and implement Modernizr as a node module in the future.
 *
 * See http://stackoverflow.com/questions/18108059/requirejs-configuration-for-modernizr
 * https://github.com/Modernizr/Modernizr/issues/1017
 */
define([
  'jquery'
], function($) {
  var ModernizrTests = function() {
    return {
      initialize: function() {

        // Css calc() test
        Modernizr.addTest('csscalc', function() {
          var calc_prefix = (function(){
            var dummy = document.createElement('div');
            var props = ['calc', '-webkit-calc', '-moz-calc', '-o-calc'];
            for (var i=0; i<props.length; ++i) {
              var prop = props[i];
              dummy.style.cssText = 'width:' + prop + '(1px);';
              if (dummy.style.length) return prop;
            }
          })();
          var el = $('<div>')[0];
          el.style.cssText = 'width:' + calc_prefix + '(10px + 10px);';
          var result = $(el).width();
          return (result == 20);
        });
      }
    };
  };

  return new ModernizrTests;
});
