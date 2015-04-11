import Ember from 'ember';

export default Ember.Route.extend({
    redirect: function(model, transition) {
        if ('index' === transition.targetName) {
            this.transitionTo('tags');
        }
    },

    actions: {
        back: function() {
            window.history.back();
        }
    }
});
