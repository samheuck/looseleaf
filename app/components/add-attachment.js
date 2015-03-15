import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        attach: function() {
            this.$('input').click();
        }
    },

    change: function(event) {
        this.sendAction('action', event.target.files[0], this.get('document'));
    }
});
