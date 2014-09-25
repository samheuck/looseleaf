import DS from 'ember-data';

var leaf = DS.Model.extend({
    type: DS.attr('string', {defaultValue: 'leaf'}),
    tags: DS.hasMany('tag', {async: true, inverse: 'leaves'}),
    title: DS.attr('string', {defaultValue: ''}),
    body: DS.attr('string', {defaultValue: ''}),
    parent: DS.belongsTo('leaf', {async: true, inverse: 'children'}),
    children: DS.hasMany('leaf', {async: true, inverse: 'parent'}),
    attachments: DS.hasMany('attachment', {async: true})
});

export default leaf;
