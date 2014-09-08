import Ember from 'ember';

// Set pluralization for API call.
var inflector = Ember.Inflector.inflector;
inflector.irregular('leaf', 'leaves');

var Router = Ember.Router.extend({
  location: LooseleafENV.locationType
});

Router.map(function() {
  this.resource('leaves', function () {
  });

  this.resource('leaf', { path: '/leaf/:id' }, function() {
    this.route('edit');
  });
});

export default Router;
