import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
    showPreview: true,
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
                console.log(result);
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
                        (function updateTag(tag) {
                            tag.get('leaves').then(function (leaves) {
                                leaves.addObject(leaf);

                                tag.save().catch(function (res) {
                                    if (409 === res.status) {
                                        tag.rollback();
                                        tag.reload().then(function (tag) {
                                            updateTag(tag);
                                        });
                                    }
                                });
                            });
                        })(tag);

                        Notify.success({raw: '<i class="fa fa-upload"></i> Tag added.'});
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
            var leaf = this.get('model');

            leaf.get('tags').then(function (tags) {
                tags.removeObject(tag);

                leaf.save().then(function () {
                    (function updateTag(tag) {
                        tag.get('leaves').then(function (leaves) {
                            leaves.removeObject(leaf);

                            tag.save().catch(function (res) {
                                if (409 === res.status) {
                                    tag.rollback();
                                    tag.reload().then(function (tag) {
                                        updateTag(tag);
                                    });
                                }
                            });
                        });
                    })(tag);

                    Notify.info({raw: '<i class="fa fa-info-circle"></i> Tag removed.'});
                }).catch(function (res) {
                    if (409 === res.status) {
                        Notify.warning({raw: '<i class="fa fa-warning"></i> Leaf is stale, reload and try again.'});
                    }
                });
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
                leaf.get('attachments').then(function (attachments) {
                    attachments.pushObject(attachment);
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