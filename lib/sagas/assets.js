import { takeLatest, delay, take } from 'redux-saga';
import { put, call, select, fork } from 'redux-saga/effects';
import moment from 'moment';

import AssetsTypes from '../constants/assets';
import AssetsActions from '../actions/assets';

import request from '../utils/request';
import { forkWatchers } from '../utils/sagas';

export default function({ apiUrl }) {
  const ASSETS_API = `${apiUrl}/assets`;
  const VIRTUAL_ASSETS_API = `${apiUrl}/virtual_assets`;
  const ASSET_ROOMS_API = `${apiUrl}/asset_rooms`;
  const CUSTOM_ACTIONS_API = `${apiUrl}/custom_actions`;
  const ROOM_AREAS_API = `${apiUrl}/room_areas`;
  const INVENTORY_WITHDRAWALS_API = `${apiUrl}/hotel_inventory_activity/withdrawal?start_date`;

  // Hotel Assets
  function * fetchAssets() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, ASSETS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchAssetsFlow() {
    try {
      const data = yield call(fetchAssets);
      yield put(AssetsActions.assetsSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchAssetsFlow(state) {
    yield * takeLatest(AssetsTypes.ASSETS_FETCH, fetchAssetsFlow);
  }

  // Hotel Virtual Assets
  function * fetchVirtualAssets() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, VIRTUAL_ASSETS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchVirtualAssetsFlow() {
    try {
      const data = yield call(fetchVirtualAssets);
      yield put(AssetsActions.virtualAssetsSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchVirtualAssetsFlow(state) {
    yield * takeLatest(AssetsTypes.VIRTUAL_ASSETS_FETCH, fetchVirtualAssetsFlow);
  }
  
  function * fetchAssetRooms() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, ASSET_ROOMS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchAssetRoomsFlow() {

    try {
      const data = yield call(fetchAssetRooms);
      yield put(AssetsActions.assetRoomsSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchAssetRoomsFlow(state) {
    yield * takeLatest(AssetsTypes.ASSET_ROOMS_FETCH, fetchAssetRoomsFlow);
  }

  // Hotel Custom Actions
  function * fetchCustomActions() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, CUSTOM_ACTIONS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchCustomActionsFlow() {

    try {
      const data = yield call(fetchCustomActions);
      yield put(AssetsActions.customActionsSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchCustomActionsFlow(state) {
    yield * takeLatest(AssetsTypes.CUSTOM_ACTIONS_FETCH, fetchCustomActionsFlow);
  }

  // Hotel Room Areas
  function * fetchRoomAreas() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, ROOM_AREAS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchRoomAreasFlow() {

    try {
      const data = yield call(fetchRoomAreas);
      yield put(AssetsActions.roomAreasSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchRoomAreasFlow(state) {
    yield * takeLatest(AssetsTypes.ROOM_AREAS_FETCH, fetchRoomAreasFlow);
  }

  // Hotel Inventory Withdrawals
  function * fetchInventoryWithdrawals() {
    const { auth: { hotelId, token } } = yield select();
    const today = moment().format('YYYY-MM-DD');
    const getUrl = `${INVENTORY_WITHDRAWALS_API}=${today}`;

    return yield call(request, getUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchInventoryWithdrawalsFlow() {

    try {
      const data = yield call(fetchInventoryWithdrawals);
      yield put(AssetsActions.inventoryWithdrawalSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchInventoryWithdrawalsFlow(state) {
    yield * takeLatest(AssetsTypes.INVENTORY_WITHDRAWAL_FETCH, fetchInventoryWithdrawalsFlow);
  }

  const watchers = {
    watchAssetsFlow,
    watchVirtualAssetsFlow,
    watchAssetRoomsFlow,
    watchCustomActionsFlow,
    watchRoomAreasFlow,
    watchInventoryWithdrawalsFlow
  }

  const root = forkWatchers(watchers);

  return {
    root,
    watchers,
    sagas: {
      fetchAssets,
      fetchAssetsFlow,
      fetchVirtualAssets,
      fetchVirtualAssetsFlow,
      fetchAssetRooms,
      fetchAssetRoomsFlow,
      fetchCustomActions,
      fetchCustomActionsFlow,
      fetchRoomAreas,
      fetchRoomAreasFlow,
      fetchInventoryWithdrawals,
      fetchInventoryWithdrawalsFlow
    }
  }
}

