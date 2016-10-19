import { takeLatest } from 'redux-saga'
import { put, select } from 'redux-saga/effects'
import { Actions as NavigationActions } from 'react-native-router-flux'

import RoutesTypes from '../constants/routes'
import UpdatesActions from '../actions/updates'

export default function() {
  function * routeBackFlow({ nav }) {
    const { rooms: { activeRoom: roomId } } = yield select()

    if (nav.sceneKey === 'inventoryLayout') {
      yield put(UpdatesActions.flushInventory({ roomId }))
    }
    NavigationActions.pop()
  }

  function * watchRouteBack() {
    yield * takeLatest(RoutesTypes.WILL_MOVE_BACK, routeBackFlow)
  }

  return {
    watchRouteBack
  }
}
