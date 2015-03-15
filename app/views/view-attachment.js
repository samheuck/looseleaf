import Ember from 'ember';

export default Ember.View.extend({
    tagName: 'input',
    attributeBindings: ['style', 'type', 'multiple'],

    type: 'file',
    multiple: true,

    actions: {
        attach: function() {
            this.$().click();
        }
    },

    change: function(event) {
        this.get('controller').send('addAttachment', event.target.files, this.get('context'));
    }
});