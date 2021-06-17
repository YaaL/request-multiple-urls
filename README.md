# Request multiple URLs

A module to fetch JSON data from multiple URLs.

Implemented in `Node.js` with:
- [got](https://github.com/sindresorhus/got) for requests with retries on failure 

## Requirements

- [node.js](https://nodejs.org/en/download/) 12.20.1+
- [npm](https://www.npmjs.com/get-npm)

## Installation

(If this was a published module)

```sh
$ npm install request-multiple-urls
```

## Usage

```javascript
const requestMultipleUrls = require('request-multiple-urls');

const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
];

requestMultipleUrls(urls).then(urlContent => {
    console.log(urlContent);
    // ...
  })
  .catch(error => console.log(error));
```

where `urlContent` is an array of fetched data:

```javascript
[
  JSONObject, // successfully fetched
  JSONObject,
  null // failed to fetch
]
```

See [example.js](./example.js) for a working example:

```sh
$ cd request-multiple-urls
$ npm install
$ node example.js
```

## Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install
$ npm test
```
