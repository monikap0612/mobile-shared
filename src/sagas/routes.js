import { takeLatest, delay, take, takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { find } from 'lodash/collection';
import { get } from 'lodash/object';

import RoutesTypes from '../constants/routes';
import RoutesActions from '../actions/routes';
import UpdatesActions from '../actions/updates';
import OverlayActions from '../actions/overlay';

export default function() {
  function * routeBackFlow({ nav }) {
    const { auth: { hotelId, token }, routes: { scene }, rooms: { activeRoom: roomId, hotelRooms } } = yield select();

    if (nav.sceneKey === "inventoryLayout") {
      yield put(UpdatesActions.flushInventory({ roomId }))
    }

    if (nav.sceneKey === "cleanLayout") {
      const room = find(hotelRooms, { _id: roomId });
      if (room && get(room, 'attendantStatus') === 'cleaning') {
        return yield put(OverlayActions.overlayShow({ icon: 'Pulse', color: '#C93C46', message: 'Cannot leave room while cleaning' }));
      }
    }

    NavigationActions.pop();
  }

  function * watchRouteBack(state) {
    yield * takeLatest(RoutesTypes.WILL_MOVE_BACK, routeBackFlow);
  }

  return {
    watchRouteBack
  }
}

