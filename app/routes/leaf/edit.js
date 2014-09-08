import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Route.extend({
    model: function() {
        return this.modelFor('leaf');
    },

    actions: {
        save: function(leaf) {
            var route = this;

            leaf.save().then(function () {
                Notify.success('Leaf Saved!');
                route.transitionTo("leaf", leaf.get('id'));
            }).catch(function (response) {
                if (response.status === 409) {
                    Notify.warning('Record is stale and must be reloaded.');
                }
            });
        },

        reload: function(leaf) {
            leaf.reload();
            Notify.info('Data has been refreshed.');
        },

        cancel: function(leaf) {
            if (leaf.get('isNew')) {
                leaf.deleteRecord();
                this.transitionTo("leaves");
            } else {
                leaf.rollback();
                this.transitionTo("leaf", leaf.get('id'));
            }
        }
    }
});
