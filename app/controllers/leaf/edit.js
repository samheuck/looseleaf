import Ember from 'ember';
import Leaf from 'looseleaf/models/leaf';

export default Ember.ObjectController.extend({
    actions: {
        addAttachment: function(files, model) {
            var docId = model.get('id'),
                revision = model._data.rev;

            function updateModel(model, attachment) {
                model.get('attachments').then(function () {
                    model.pushObject(attachment);
                });

                model.reload();
            }

            // for (var i = 0; i < files.length; i++) {
                var attachment = this.store.createRecord('attachment', {
                    id: '%@/%@'.fmt(docId, files[0].name),
                    doc_id: docId,
                    rev: revision,
                    model_name: Leaf,
                    file: files[0],
                    content_type: files[0].type,
                    length: files[0].size,
                    file_name: files[0].name
                });

                console.log(attachment);

                attachment.save();//.then(updateModel(model, attachment));
            // }
        },

        deleteAttachment: function(attachment) {
            attachment.deleteRecord();
            attachment.save();
        }
    }
});