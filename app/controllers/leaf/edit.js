import config from '../../config/environment';
import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
    showPreview: true,
    matchingTags: Ember.ArrayProxy.create(),

    selectedTagChanged: function() {
        Ember.run.debounce(this, this.updateMatchingTags, 500);
    }.observes('selectedTag'),

    updateMatchingTags: function() {
        var controller = this,
            url = "%@/%@/_design/tag/_view/substrings?include_docs=false&key=%22%@%22".fmt(
                config.dbHost,
                config.dbName,
                this.get('selectedTag')
            );

        $.ajax(url).then(function (response) {
            var result = JSON.parse(response);

            if (result.rows.length) {
                controller.get('matchingTags').set('content', result.rows.map(function (match) {
                    return {tag: match.value, id: match.id};
                }));
            } else {
                controller.get('matchingTags').set('content', []);
            }
        });
    },

    updateTag: function(tag, updateLeaves) {
        var controller = this;

        tag.get('leaves').then(function (leaves) {
            updateLeaves(leaves);

            tag.save().catch(function (res) {
                if (409 === res.status) {
                    tag.rollback();
                    tag.reload().then(function (tag) {
                        controller.updateTag(tag, updateLeaves);
                    });
                }
            });
        });
    },

    actions: {
        addTag: function() {
            var controller = this,
                leaf = controller.get('model'),
                selectedTag = this.get('selectedTag'),
                matchedTag = this.get('matchingTags').findBy('tag', selectedTag),
                tagToAdd = matchedTag ?
                    controller.store.find('tag', matchedTag.id):
                    controller.store.createRecord('tag', {tag: selectedTag}).save();

            tagToAdd.then(function (tag) {
                leaf.get('tags').then(function (tags) {
                    tags.addObject(tag);

                    leaf.save().then(function () {
                        controller.updateTag(tag, function (leaves) {
                            leaves.addObject(leaf);
                        });

                        Notify.success({raw: '<i class="fa fa-cloud-upload"></i> Tag added.'});
                    }).catch(function (res) {
                        if (409 === res.status) {
                            Notify.warning({raw: '<i class="fa fa-warning"></i> Leaf is stale, reload and try again.'});
                        }
                    });
                });
            });

            this.set('selectedTag', null);
        },

        removeTag: function(tag) {
            var controller = this,
                leaf = this.get('model');

            leaf.get('tags').then(function (tags) {
                tags.removeObject(tag);

                leaf.save().then(function () {
                    controller.updateTag(tag, function (leaves) {
                        leaves.removeObject(leaf);
                    });

                    Notify.info({raw: '<i class="fa fa-info-circle"></i> Tag removed.'});
                }).catch(function (res) {
                    if (409 === res.status) {
                        Notify.warning({raw: '<i class="fa fa-warning"></i> Leaf is stale, reload and try again.'});
                    }
                });
            });
        },

        addAttachment: function(file, leaf) {
            var self = this;
            leaf.save().then(createAttachment);

            function createAttachment(leaf) {
                self.store.createRecord('attachment', {
                    id: '%@/%@'.fmt(leaf.get('id'), file.name),
                    doc_id: leaf.get('id'),
                    rev: leaf._data.rev,
                    model_name: 'leaf',
                    file: file,
                    content_type: file.type,
                    length: file.size,
                    file_name: file.name
                })
                .save()
                .then(function attachNewAttachment(attachment) {
                    leaf.get('attachments').then(function (attachments) {
                        attachments.pushObject(attachment);
                        Notify.success({raw: '<i class="fa fa-cloud-upload"></i> Attacment saved'});
                    });

                    leaf.reload();
                });
            }
        },

        deleteAttachment: function(attachment) {
            attachment.destroyRecord();
        }
    }
});