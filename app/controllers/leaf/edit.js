import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
    actions: {
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
                    Notify.success({raw: '<i class="fa fa-cloud-upload"</i> Attachment saved!'});
                });

                leaf.reload();
            }
        },

        deleteAttachment: function(attachment) {
            attachment.destroyRecord();
        }
    }
});