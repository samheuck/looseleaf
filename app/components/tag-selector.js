import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    tags: Ember.ArrayProxy.create(),

    selectedTagChanged: function() {
        Ember.run.debounce(this, this.updateMatchingTags, 500);
    }.observes('value'),

    updateMatchingTags: function() {
        var component = this;

        var url = "%@/%@/_design/tag/_view/substrings?include_docs=false&key=%22%@%22".fmt(
            config.dbHost,
            config.dbName,
            this.get('value')
        );

        $.ajax(url).then(function (response) {
            var result = JSON.parse(response);

            if (result.rows.length) {
                component.get('tags').set('content', result.rows.map(function (match) {
                    return {
                        tag: match.value,
                        id: match.id
                    };
                }));
            } else {
                component.get('tags').set('content', []);
            }
        });
    },
});
