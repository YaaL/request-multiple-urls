'use strict';
/* eslint-env jest */

const mockGet = jest.fn();

jest.mock('got', () => {
  const actual = jest.requireActual('got');
  return Object.assign({}, actual, { get: mockGet });
});

jest.mock('got');

const requestMultipleUrls = require('../index');

describe('request-multiple-urls', () => {
  const mockUrls = ['url1', 'url2', 'invalid'];
  const mockOptions = {
    responseType: 'json',
    resolveBodyOnly: true,
  };
  const mockResponses = ['response1', 'response2'];

  beforeEach(() => {
    mockGet
      .mockResolvedValueOnce(mockResponses[0])
      .mockResolvedValueOnce(mockResponses[1])
      .mockRejectedValueOnce(null);
  });

  afterEach(() => {
    mockGet.mockClear();
  });

  describe('with invalid argument', () => {
    it('fails when called without argument', () => {
      return requestMultipleUrls().catch((e) => {
        expect(e).toMatchObject(new Error('No arguments provided'));
        expect(mockGet).not.toHaveBeenCalled();
      });
    });

    it('fails when called with invalid argument', () => {
      return requestMultipleUrls('string').catch((e) => {
        expect(e).toMatchObject(
          new Error('Invalid arguments - expected array of urls')
        );
        expect(mockGet).not.toHaveBeenCalled();
      });
    });
  });

  describe('with valid argument', () => {
    it('calls got.get with provided urls', () => {
      return requestMultipleUrls(mockUrls).then((data) => {
        expect(mockGet).toHaveBeenCalledTimes(3);
        expect(mockGet).toHaveBeenCalledWith(mockUrls[0], mockOptions);
        expect(mockGet).toHaveBeenCalledWith(mockUrls[1], mockOptions);
        expect(mockGet).toHaveBeenCalledWith(mockUrls[2], mockOptions);
      });
    });

    it('returns array of received data', () => {
      return requestMultipleUrls(mockUrls).then((data) => {
        expect(data).toEqual(expect.any(Array));
        expect(data).toHaveLength(3);
      });
    });

    describe('returned array', () => {
      it('contains JSON content fetched by got', () => {
        return requestMultipleUrls(mockUrls).then((data) => {
          expect(data[0]).toEqual(mockResponses[0]);
        });
      });

      it('contains empty value when got failed to fetch content', () => {
        return requestMultipleUrls(mockUrls).then((data) => {
          expect(data[2]).toEqual(null);
        });
      });
    });
  });
});
