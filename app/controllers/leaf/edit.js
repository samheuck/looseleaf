import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
  showPreview: true,
  availableTags: Ember.ArrayProxy.create(),

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
        matchedTag = this.get('availableTags').findBy('tag', selectedTag),
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
      var promise = leaf.get('isDirty') ? leaf.save() : Ember.RSVP.resolve(leaf);

      promise
      .then(createAttachment)
      .then(notify)
      .catch(error);

      function createAttachment(leaf) {
        var attachment = {
          id: '%@/%@'.fmt(leaf.get('id'), file.name),
          doc_id: leaf.get('id'),
          rev: leaf._data.rev,
          model_name: 'leaf',
          file: file,
          content_type: file.type,
          length: file.size,
          file_name: file.name
        };

        return self.store.createRecord('attachment', attachment).save();
      }

      function notify() {
        leaf.reload();
        Notify.success({raw: '<i class="fa fa-cloud-upload"></i> Attacment saved'});
      }

      function error(err) {
        console.log(err);
        Notify.error('Something went wrong...');
      }
    },

    deleteAttachment: function(attachment) {
      attachment.destroyRecord();
    }
  }
});