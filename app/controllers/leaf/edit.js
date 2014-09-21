import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
    matchingTags: Ember.ArrayProxy.create(),

    updateMatchingTags: function() {
        var controller = this,
            url = "%@/%@/_design/tag/_view/substrings?include_docs=false&key=%22%@%22".fmt(
                LooseleafENV.dbHost,
                LooseleafENV.dbName,
                this.get('selectedTag')
            );

        $.ajax(url).then(
            function (response) {
                var result = JSON.parse(response);

                if (result.rows.length) {
                    controller.get('matchingTags').set('content', result.rows.map(function (match) {
                        return {tag: match.value, id: match.id};
                    }));
                } else {
                    controller.get('matchingTags').set('content', []);
                }
            }
        );
    }.observes('selectedTag'),

    actions: {
        addTag: function() {
            var controller = this,
                selectedTag = this.get('selectedTag'),
                matchedTag = this.get('matchingTags').findBy('tag', selectedTag);

            if (matchedTag) {
                controller.store.find('tag', matchedTag.id).then(function (tag) {
                    controller.get('tags').then(function (tags) {
                        tags.pushObject(tag);
                    });
                });
            } else {
                var newTag = controller.store.createRecord('tag', {
                    tag: selectedTag,
                }).save();

                newTag.then(function (tag) {
                    Notify.success({raw: '<i class="fa fa-upload"></i> New tag created'});
                    controller.get('tags').then(function (tags) {
                        tags.pushObject(tag);
                    });
                });
            }

            this.set('selectedTag', null);
        },

        removeTag: function(tag) {
            this.get('tags').then(function (tags) {
                tags.removeObject(tag);
            });
        },

        addAttachment: function(files, leaf) {
            for (var i = 0; i < files.length; i++) {
                var attachment = this.store.createRecord('attachment', {
                    id: '%@/%@'.fmt(leaf.get('id'), files[0].name),
                    doc_id: leaf.get('id'),
                    rev: leaf._data.rev,
                    model_name: 'leaf',
                    file: files[0],
                    content_type: files[0].type,
                    length: files[0].size,
                    file_name: files[0].name
                });

                attachment.save().then(updateLeaf);
            }

            function updateLeaf(attachment) {
                leaf.get('attachments').then(function (array) {
                    array.pushObject(attachment);
                    Notify.success({raw: '<i class="fa fa-upload"</i> Attachment saved!'});
                });

                leaf.reload();
            }
        },

        deleteAttachment: function(attachment) {
            attachment.destroyRecord();
        }
    }
});