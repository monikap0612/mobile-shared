import { HttpError, NetworkError } from './errors';
import { Config } from '../network';
import { get } from 'lodash/object';

function checkHeaders(url, options) {
  if (get(options, 'headers.Authorization') && get(options, 'headers.Authorization') === 'Bearer null') {
    return Promise.reject('Bearer Authorization is null.')
  }

  return Promise.resolve(url, options);
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.text().then((text) => text ? JSON.parse(text) : null);
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new HttpError(response.statusText, response);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
const timeoutPromise = (ms) => (promise) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(Config.ERROR_MESSAGE))
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  })
}

const timeout = timeoutPromise(Config.TIMEOUT_TIME);

export function request(url, options) {
  return timeout(fetch(url, options))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      const error = (err instanceof HttpError) ? err : new NetworkError(err, url);
      throw error;
    })
}

export default request;
