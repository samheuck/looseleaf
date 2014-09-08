import DS from 'ember-data';

var leaf = DS.Model.extend({
    type: DS.attr('string', {defaultValue: 'leaf'}),
    title: DS.attr('string'),
    body: DS.attr('string')
});

export default leaf;

