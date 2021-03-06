/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

/**
 * Font awesome
 */
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {destDir: 'fonts'});
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.svg', {destDir: 'fonts'});
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.eot', {destDir: 'fonts'});
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {destDir: 'fonts'});
app.import('bower_components/font-awesome/fonts/FontAwesome.otf', {destDir: 'fonts'});

/**
 * Non ES6 JS.
 */
app.import('bower_components/ember-couchdb-kit/dist/ember-couchdb-kit.js');
app.import('bower_components/marked/lib/marked.js');
app.import('bower_components/highlightjs/highlight.pack.js');

/**
 * Foundation JS.
 */
app.import('bower_components/foundation/js/foundation/foundation.js');

/**
 * CodeMirror
 */
app.import('bower_components/codemirror/lib/codemirror.css');
app.import('bower_components/codemirror/lib/codemirror.js');
app.import('bower_components/codemirror/mode/markdown/markdown.js');
app.import('bower_components/codemirror/keymap/sublime.js');
app.import('bower_components/codemirror/addon/edit/closebrackets.js');
app.import('bower_components/codemirror/addon/edit/matchbrackets.js');

/**
 * CSS
 */
app.import('bower_components/highlightjs/styles/foundation.css');
app.import('bower_components/highlightjs/styles/monokai_sublime.css');

module.exports = app.toTree();
