/**
 * Backbone module model template
 */
define([
  'backbone'
], function(Backbone) {
  var _ModuleModel = Backbone.Model.extend({
    defaults: function() {
      return {
      };
    }
  });

  return _ModuleModel;
});
