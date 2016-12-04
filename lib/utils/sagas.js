import { fork } from 'redux-saga/effects';

export const forkWatchers = (watchers) => function * () {
  yield Object.values(watchers).map(fork);
}
