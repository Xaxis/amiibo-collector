/**
 * Backbone module collection template
 */
define([
  'backbone',
  '../models/_moduleModel'
], function(Backbone, _ModulesModel) {
  var _ModuleCollection = Backbone.Collection.extend({
    model: _ModulesModel
  });

  return _ModuleCollection;
});
