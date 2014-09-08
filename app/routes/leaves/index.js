import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.find('leaf');
    },

    actions: {
        new: function() {
            var leaf;

            leaf = this.store.createRecord('leaf');
            this.transitionTo('leaf.edit', leaf.get('id'));
        }
    }
});
