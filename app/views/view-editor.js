/* global CodeMirror */
import Ember from 'ember';

var editorView = Ember.View.extend({
    tagName: "textarea",

    didInsertElement: function() {
        var self = this,
            el = self.$().get(0),
            value = self.get('value'),
            codemirror = new CodeMirror.fromTextArea(el, {
                mode: 'markdown',
                lineWrapping: true,
                keyMap: 'sublime',
                matchBrackets: true,
                autoCloseBrackets: true,
            });

        codemirror.on("change", function (instance) {
            Ember.run(function () {
                self.set('value', instance.getValue());
            });
        });

        codemirror.setValue(value);

        this.set('editor', codemirror);
    },

    update: function() {
        var editor = this.get('editor');

        if (editor.getValue() !== this.get('value')) {
            editor.setValue(this.get('value'));
        }
    }.observes('value')
});

export default editorView;
