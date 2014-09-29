import Ember from 'ember';
import Notify from 'ember-notify';

var tagsIndex = Ember.Route.extend({
    model: function() {
        return this.store.find('tag');
    },

    actions: {
        deleteTag: function(tag) {
                console.log(tag);
            tag.get('leaves').then(function (leaves) {
                if (0 === leaves.get('length')) {
                    tag.destroyRecord();
                    Notify.info({raw: '<i class="fa fa-info-circle"></i> Tag removed.'});
                }
            });
        }
    }
});

export default tagsIndex;