import Ember from 'ember';

var tagsIndex = Ember.Route.extend({
    model: function() {
        return this.store.find('tag');
    }
});

export default tagsIndex;