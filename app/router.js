import Ember from 'ember';
import config from './config/environment';

// Set pluralization for API call.
var inflector = Ember.Inflector.inflector;
inflector.irregular('leaf', 'leaves');

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('leaves', function () {
  });

  this.resource('leaf', { path: '/leaf/:id' }, function() {
    this.route('edit');
  });

  this.resource('tags', function() {
  });
});

export default Router;
