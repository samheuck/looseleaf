import DS from 'ember-data';

var leaf = DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string')
});

// leaf.reopenClass({
//     FIXTURES: {

//     }
// });

export default leaf;

