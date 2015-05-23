import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Route.extend({
  actions: {
    back: function() {
      window.history.back();
    },

    new: function() {
      var route = this,
        leaf = this.store.createRecord('leaf');

      leaf.save().then(function () {
        route.transitionTo('leaf.edit', leaf.get('id'));
        Notify.success({raw: '<i class="fa"></i> New leaf created!'});
      }).catch(function () {
        Notify.warning({raw: '<i class="fa"></i> Something went wrong...'});
      });
    }
  }
});
