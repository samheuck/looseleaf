import Ember from 'ember';
import Notify from 'ember-notify';

var tagsIndex = Ember.Route.extend({
    model: function() {
        return this.store.find('tag');
    },

    actions: {
        deleteTag: function(tag) {
            tag.destroyRecord();
            Notify.info({raw: '<i class="fa fa-info-circle"></i> Tag removed.'});
        }
    }
});

export default tagsIndex;