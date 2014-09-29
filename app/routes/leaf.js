import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('leaf', params.id);
    },

    actions: {
        delete: function(leaf) {
            var title = leaf.get('title');

            leaf.one('didDelete', this, function() {
                this.transitionTo('leaves');
            });

            leaf.get('tags').then(function (tags) {
                Ember.RSVP.all(tags.map(function (tag) {
                    var leaf = this;

                    return new Ember.RSVP.Promise(function (resolve, reject) {
                        (function removeLeafFromTag(tag) {
                            tag.get('leaves').then(function (leaves) {
                                leaves.removeObject(leaf);

                                tag.save().then(function () {
                                    resolve();
                                }).catch(function (res) {
                                    if (409 === res.status) {
                                        tag.rollback();

                                        tag.reload().then(function (tag) {
                                            removeLeafFromTag(tag);
                                        });
                                    } else {
                                        reject();
                                    }
                                });
                            });
                        })(tag);
                    });
                }, leaf)).then(function () {
                    leaf.destroyRecord();
                    Notify.success({raw: '<i class="fa fa-info-circle"></i> %@ deleted.'.fmt(title)});
                });
            });
        }
    }

});
