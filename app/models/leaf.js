import DS from 'ember-data';

var leaf = DS.Model.extend({
    type: DS.attr('string', {defaultValue: 'leaf'}),
    title: DS.attr('string', {defaultValue: ''}),
    body: DS.attr('string', {defaultValue: ''}),
    attachments: DS.hasMany('attachment', {async: true})
});

export default leaf;

