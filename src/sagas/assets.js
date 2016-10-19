import { takeLatest } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import moment from 'moment'

import AssetsTypes from '../constants/assets'
import AssetsActions from '../actions/assets'

import request from '../utils/request'

export default function ({ apiUrl }) {
  const ASSETS_API = `${apiUrl}/assets`
  const VIRTUAL_ASSETS_API = `${apiUrl}/virtual_assets`
  const ASSET_ROOMS_API = `${apiUrl}/asset_rooms`
  const CUSTOM_ACTIONS_API = `${apiUrl}/custom_actions`
  const ROOM_AREAS_API = `${apiUrl}/room_areas`
  const INVENTORY_WITHDRAWALS_API = `${apiUrl}/hotel_inventory_activity/withdrawal?start_date`

  // Hotel Assets
  function * fetchAssets() {
    const { auth: { token } } = yield select()

    return yield call(request, ASSETS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchAssetsFlow() {
    try {
      const data = yield call(fetchAssets)
      yield put(AssetsActions.assetsSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchAssetsFlow() {
    yield * takeLatest(AssetsTypes.ASSETS_FETCH, fetchAssetsFlow)
  }

  // Hotel Virtual Assets
  function * fetchVirtualAssets() {
    const { auth: { token } } = yield select()

    return yield call(request, VIRTUAL_ASSETS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchVirtualAssetsFlow() {
    try {
      const data = yield call(fetchVirtualAssets)
      yield put(AssetsActions.virtualAssetsSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchVirtualAssetsFlow() {
    yield * takeLatest(AssetsTypes.VIRTUAL_ASSETS_FETCH, fetchVirtualAssetsFlow)
  }

  // Hotel Asset Rooms
  function * fetchAssetRooms() {
    const { auth: { token } } = yield select()

    return yield call(request, ASSET_ROOMS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchAssetRoomsFlow() {

    try {
      const data = yield call(fetchAssetRooms)
      yield put(AssetsActions.assetRoomsSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchAssetRoomsFlow() {
    yield * takeLatest(AssetsTypes.ASSET_ROOMS_FETCH, fetchAssetRoomsFlow)
  }

  // Hotel Custom Actions
  function * fetchCustomActions() {
    const { auth: { token } } = yield select()

    return yield call(request, CUSTOM_ACTIONS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchCustomActionsFlow() {

    try {
      const data = yield call(fetchCustomActions)
      yield put(AssetsActions.customActionsSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchCustomActionsFlow() {
    yield * takeLatest(AssetsTypes.CUSTOM_ACTIONS_FETCH, fetchCustomActionsFlow)
  }

  // Hotel Room Areas
  function * fetchRoomAreas() {
    const { auth: { token } } = yield select()

    return yield call(request, ROOM_AREAS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchRoomAreasFlow() {

    try {
      const data = yield call(fetchRoomAreas)
      yield put(AssetsActions.roomAreasSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchRoomAreasFlow() {
    yield * takeLatest(AssetsTypes.ROOM_AREAS_FETCH, fetchRoomAreasFlow)
  }

  // Hotel Inventory Withdrawals
  function * fetchInventoryWithdrawals() {
    const { auth: { token } } = yield select()
    const today = moment().format('YYYY-MM-DD')
    const getUrl = `${INVENTORY_WITHDRAWALS_API}=${today}`

    return yield call(request, getUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchInventoryWithdrawalsFlow() {
    try {
      const data = yield call(fetchInventoryWithdrawals)
      yield put(AssetsActions.inventoryWithdrawalSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchInventoryWithdrawalsFlow() {
    yield * takeLatest(AssetsTypes.INVENTORY_WITHDRAWAL_FETCH, fetchInventoryWithdrawalsFlow)
  }

  return {
    watchInventoryWithdrawalsFlow,
    watchRoomAreasFlow,
    watchCustomActionsFlow,
    watchAssetRoomsFlow,
    watchVirtualAssetsFlow,
    watchAssetsFlow
  }
}
