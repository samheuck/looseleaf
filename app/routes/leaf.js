import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('leaf', params.id);
    },

    actions: {
        delete: function(leaf) {
            var title = leaf.get('title');

            leaf.one('didDelete', this, function() {
                this.transitionTo('leaves');
            });

            leaf.destroyRecord();
            Notify.info({raw: '<i class="fa fa-info-circle"></i> ' + title + ' deleted.'});
        }
    }

});
