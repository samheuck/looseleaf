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

  ### CouchDB

  ```json
  {
     "_id": "_design/leaf",
     "views": {
         "all": {
             "map": "function(doc) { emit(doc.type, null); }"
         }
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
