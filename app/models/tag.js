import DS from 'ember-data';

var tag = DS.Model.extend({
  type: DS.attr('string', {defaultValue: 'tag'}),
  tag: DS.attr('string'),
  leaves: DS.hasMany('leaf', {async: true, inverse: 'tags'})
});

export default tag;
