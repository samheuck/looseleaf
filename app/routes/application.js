import Ember from 'ember';

export default Ember.Route.extend({
    redirect: function() {
        this.transitionTo('tags');
    },

    actions: {
        back: function() {
            window.history.back();
        }
    }
});
