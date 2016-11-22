/**
 * jQuery.devgrid initialization
 */
define([
  'jquery',
  'jquery.devgrid'
], function($) {
  var Devgrid = function() {
    return {
      initialize: function() {
        $('body').devgrid({
          columns: 24,
          columnWidth: '40px',
          gutterWidth: '20px',
          visible: false,
          track: true,
          vertical: true,
          horizontal: false,
          distributeGutter: true,
          gridStyle: {
            'max-width': '1440px'
          },
          breakpoints: [
            {
              bp: '480px',
              tag: 'Mobile',
              css: {
                background: 'rgba(85, 98, 112, 0.25)'
              }
            },
            {
              bp: '780px',
              tag: 'Tablet',
              css: {
                background: 'rgba(78, 205, 196, 0.25)'
              }
            },
            {
              bp: '960px',
              tag: 'Desktop',
              css: {
                background: 'rgba(199, 244, 100, 0.25)'
              }
            },
            {
              bp: '1440px',
              tag: 'Wide',
              css: {
                background: 'rgba(255, 107, 107, 0.25)'
              }
            }
          ]
        });
      }
    };
  };

  return new Devgrid;
});
