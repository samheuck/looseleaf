/* global marked */
/* global hljs */
import Ember from "ember";

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

export default Ember.Handlebars.makeBoundHelper(function (text) {
    return new Ember.Handlebars.SafeString(marked(text));
});
