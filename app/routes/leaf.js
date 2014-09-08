import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('leaf', params.id);
    },

    actions: {
        delete: function(leaf) {
            leaf.one('didDelete', this, function() {
                this.transitionTo('leaves');
            });

            leaf.destroyRecord();
        }
    }

});
