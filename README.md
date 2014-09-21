# Looseleaf

## Prerequisites

  - [CouchDB]()
  - [EmberCli]()
  - [Node.js]()
  - [Bower]()

## Installation

  - `git clone <repository-url>` this repository
  - `npm install`
  - `bower install`

  ### CouchDB Design Docs

  ```json
  {
     "_id": "_design/leaf",
     "language": "javascript",
     "views": {
         "all": {
             "map": "function(doc) { if (doc.title && doc.body) emit(doc.type, doc.title); }"
         }
     }
  }

  {
   "_id": "_design/tag",
   "language": "javascript",
   "views": {
       "all": {
           "map": "function(doc) { if (doc.tag) emit(doc.type, doc.tag); }"
       },
       "substrings": {
           "map": "function(doc) { var i; if (doc.tag) { for (i = 1; i <= doc.tag.length; i += 1) { emit(doc.tag.substring(0, i), doc.tag); }}}"
       }
   }
  ```

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
