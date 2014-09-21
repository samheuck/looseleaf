import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Route.extend({
    model: function() {
        return this.store.find('leaf');
    },

    actions: {
        new: function() {
            var route = this,
                leaf = this.store.createRecord('leaf');

            leaf.save().then(function () {
                route.transitionTo('leaf.edit', leaf.get('id'));
                Notify.success({raw: '<i class="fa"></i> New leaf created!'});
            }).catch(function (e) {
                console.log(e);
                Notify.warning({raw: '<i class="fa"></i> Something went wrong...'});
            });
        }
    }
});
