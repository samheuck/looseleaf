import Ember from 'ember';

export default Ember.View.extend({
    tagName: 'input',
    attributeBindings: ['style', 'type', 'multiple'],
    style: 'display:none',
    type: 'file',
    multiple: false,

    actions: {
        attach: function() {
            this.$().click();
        }
    },

    change: function(event) {
        this.get('controller').send('addAttachment', event.target.files, this.get('context'));
    }
});