import { Client } from 'bugsnag-react-native';
import get from 'lodash/get';
import extend from 'lodash/extend';

const client = new Client();

const decycle = (obj) => {
  let cache = [];

  const stringified = JSON.stringify(obj, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        return;
      }
      cache.push(value);
    }
    return value;
  });
  cache = null;

  return stringified;
}

export const bugsnagMiddleware = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    console.error('Reporting issue to bugsnag', error);

    const state = extend({}, store.getState());

    client.notifyException(error, {
      action: decycle(action),
      state: decycle(state)
    });
  }
}

client.notify(new Error("Test Error"));

export default client;