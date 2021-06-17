'use strict';

const got = require('got');

module.exports = (urls) => {
  if (!urls) {
    return Promise.reject(new Error('No arguments provided'));
  }

  if (!Array.isArray(urls)) {
    return Promise.reject(
      new Error('Invalid arguments - expected array of urls')
    );
  }

  return Promise.allSettled(
    urls.map((url) =>
      // got will automatically retry
      got.get(url, {
        responseType: 'json',
        resolveBodyOnly: true,
      })
    )
  ).then((responses) => {
    const urlContents = responses.map((response) => {
      if (response.status === 'rejected') {
        return null;
      }

      return response.value;
    });

    return urlContents;
  });
};
