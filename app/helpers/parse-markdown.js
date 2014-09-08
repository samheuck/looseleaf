import Ember from "ember";

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

export default Ember.Handlebars.makeBoundHelper(function (text) {
    return new Ember.Handlebars.SafeString(marked(text));
});