import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Route.extend({
    model: function() {
        return this.modelFor('leaf');
    },

    afterModel: function(model) {
        if (!model.get('isNew')) {
            model.reload();
        }
    },

    actions: {
        save: function(leaf) {
            var route = this;

            leaf.save().then(function () {
                Notify.success({raw:'<i class="fa fa-cloud-upload"></i> Leaf Saved!'});
                route.transitionTo('leaf', leaf.get('id'));
            }).catch(function (response) {
                if (response.status === 409) {
                    Notify.warning({raw: '<i class="fa fa-exclamation-circle"></i> Leaf is stale. Reload before saving.'});
                }
            });
        },

        reload: function(leaf) {
            if (!leaf.get('isNew')) {
                leaf.rollback();
                leaf.reload().then(function () {
                    Notify.info({raw: '<i class="fa fa-info-circle"></i> Leaf has been refreshed.'});
                });
            }
        },

        cancel: function(leaf) {
            if (leaf.get('isNew')) {
                leaf.deleteRecord();
                this.transitionTo("leaves");
            } else if (leaf.get('isDirty')) {
                leaf.rollback();
                Notify.info({raw: '<i class="fa fa-info-circle"></i> Changes reverted.'});
                this.transitionTo('leaf', leaf.get('id'));
            } else {
                this.transitionTo('leaf', leaf.get('id'));
            }
        },

        error: function(error, transition) {
            console.log(error);
        }
    }
});
