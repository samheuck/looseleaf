/* global CodeMirror */
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "textarea",

  editor: function() {
    var self = this;

    var el = self.$().get(0);
    var body = self.get('body');

    var codemirror = new CodeMirror.fromTextArea(el, {
      mode: 'markdown',
      lineWrapping: true,
      keyMap: 'sublime',
      matchBrackets: true,
      autoCloseBrackets: true
    });

    codemirror.on("change", function (instance) {
      Ember.run(function () {
        self.set('body', instance.getValue());
      });
    });

    codemirror.setValue(body);

    this.set('editor', codemirror);
  }.on('didInsertElement'),

  update: function() {
    var editor = this.get('editor');

    if (editor.getValue() !== this.get('body')) {
      editor.setValue(this.get('body'));
    }
  }.observes('body')
});
