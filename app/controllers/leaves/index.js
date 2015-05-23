import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['updated'],
  sortAscending: false,
  filterBy: '',

  leaves: function() {
    var leaves = this.get('arrangedContent');
    var filter = this.get('filterBy');

    return (filter === '') ? leaves : leaves.filter(hasTag);

    function hasTag(leaf) {
      return leaf.get('tags').any(function (tag) {
        return tag.get('tag') === filter;
      });
    }
  }.property('filterBy'),

  actions: {
    preview: function (leaf) {
      var previewing = this.get('previewing');

      if (previewing) {
        previewing.set('active', false);
      }

      leaf.set('active', true);
      this.set('previewing', leaf);
    }
  }
});
