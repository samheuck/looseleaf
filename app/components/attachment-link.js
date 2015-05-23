import config from '../config/environment';
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['href', 'target'],

  href: function() {
    return '%@/%@/%@'.fmt(config.dbHost, config.dbName, this.get('uri'));
  }.property(),

  target: '_blank',
});
