'use strict';

const requestMultipleUrls = require('./index');

const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/invalid.json',
];

requestMultipleUrls(urls)
  .then((urlContent) => {
    console.log(urlContent);
  })
  .catch((err) => console.log('ERROR', err));
