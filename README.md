# Looseleaf

Looseleaf is a simple text editor and document database. It's designed to be fast
and easy to create text documents in a browser. Documents are written in markdown and
stored as JSON objects in the database.

## Prerequisites

  - [CouchDB](http://docs.couchdb.org/en/1.6.1/)

   On Mac OS use Homebrew to install: ```brew install couchdb```

  - [Node.js](https://nodejs.org/api/)

   On Mac OS, use Homebrew to install: ```brew install node```

  - [Bower](http://bower.io/docs/api/)

   Install with npm: ```npm install -g bower```

  - [Ember CLI](http://www.ember-cli.com/#getting-started)

   ```npm install -g ember-cli```


## Installation

clone this repository then run

  - `npm install`
  - `bower install`

  **Upload CouchDB Design Docs**

  These documents must exist in CouchDB so that ember-data can query for documents. The easiest way
  to get them into CouchDB is by using the CouchDB admin interface: ```localhost:5984/_utils```

  1. Create a database called ```looseleaf```
  1. Create a document
  1. Click on the newly created document, then click on the "source" tab
  1. Dbl click the contents and paste in the JSON below
  1. Repeat steps 2 - 4 for each JSON snippet below

  ```json
  {
     "_id": "_design/leaf",
     "language": "javascript",
     "views": {
         "all": {
             "map": "function(doc) { if (doc.title) emit(doc.type, doc.title); }"
         }
     }
  }
  ```

  ```json
  {
   "_id": "_design/tag",
   "language": "javascript",
   "views": {
       "all": {
           "map": "function(doc) { if (doc.tag) emit(doc.type, doc.tag); }"
       },
       "substrings": {
           "map": "function (doc) { var i; if (doc.tag) { emit(doc.tag, doc.tag); doc.tag.split(' ').map(function (token) {  for (i = 1; i <= token.length; i += 1) { emit(token.substring(0, i), doc.tag); }}); }}"
       }
     }
   }
  ```

## CouchDB configuration

Homebrew will save the config file for CouchDB to ```/usr/local/etc/couchdb/local.ini```.
Make sure that cors is enabled:

```
[cors]
origins = *
```

CouchDB can use a *large* amount of disk space quickly, so it's a good idea, although not required, to set up
routine db compaction. Compaction reduces disk usage by removing revisions of documents and views. Check out the
[compaction daemon docs](http://docs.couchdb.org/en/latest/config/compaction.html).

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build` (development)
* `ember build --environment production` (production)

## Deployment

## Further Reading / Useful Links

  - ember: http://emberjs.com
  - ember-cli: http://www.ember-cli.com/

  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
