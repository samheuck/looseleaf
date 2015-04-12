import Ember from 'ember';

export default Ember.ArrayController.extend({
    actions: {
        preview: function (leaf) {
            this.set('previewing', leaf);
        }
    }
});