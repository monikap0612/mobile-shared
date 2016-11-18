import { fork } from 'redux-saga/effects';
import sagas from '../../lib/sagas';

import API_URL from '../api';

const params = { apiUrl: API_URL };

// const assetsSaga = sagas.assets(params);
// const glitchesSaga = sagas.glitches(params);
// const usersSaga = sagas.users(params);
// const roomsSaga = sagas.rooms(params);
// const authSaga = sagas.auth(params);
// const routesSaga = sagas.routes(params);
const updatesSaga = sagas.updates(params);

// const assets = Object.values(assetsSaga);
// const glitches = Object.values(glitchesSaga);
// const users = Object.values(usersSaga);
// const rooms = Object.values(roomsSaga);
// const auth = Object.values(authSaga);
// const routes = Object.values(routesSaga);
const updatesWatchers = Object.values(updatesSaga.watchers);

export const watchers = {
  // ...assetsSaga,
  // ...glitchesSaga,
  // ...usersSaga,
  // ...roomsSaga,
  // ...authSaga,
  // ...routesSaga,
  ...updatesSaga.watchers,
}

export const flows = {
  // ...assetsSaga,
  // ...glitchesSaga,
  // ...usersSaga,
  // ...roomsSaga,
  // ...authSaga,
  // ...routesSaga,
  ...updatesSaga.flows,
}

export default function * root () {
  yield updatesWatchers.map(fork)
  // yield assets
  //       .concat(glitches).concat(users)
  //       .concat(updates).concat(rooms)
  //       .concat(auth).concat(routes)
  //       .map(fork)
}

// export const sagas = (runner) => {
//   const params = { apiUrl: API_URL, runner };

//   const assets = Object.values(sagas.assets(params));
//   const glitches = Object.values(sagas.glitches(params));
//   const users = Object.values(sagas.users(params));
//   const updates = Object.values(sagas.updates(params));
//   const rooms = Object.values(sagas.rooms(params));
//   const auth = Object.values(sagas.auth(params));
//   const routes = Object.values(sagas.routes(params));

//   return function * root () {
//     yield assets
//           .concat(glitches).concat(users)
//           .concat(updates).concat(rooms)
//           .concat(auth).concat(routes)
//           .map(fork)
//   }
// } 
