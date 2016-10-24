import { takeLatest, delay, take } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import moment from 'moment';

import AssetsTypes from '../constants/assets';
import AssetsActions from '../actions/assets';

import request from '../utils/request';
import API_URL from '../api';

const ASSETS_API = `${API_URL}/assets`;
const VIRTUAL_ASSETS_API = `${API_URL}/virtual_assets`;
const ASSET_ROOMS_API = `${API_URL}/asset_rooms`;
const CUSTOM_ACTIONS_API = `${API_URL}/custom_actions`;
const ROOM_AREAS_API = `${API_URL}/room_areas`;
const INVENTORY_WITHDRAWALS_API = `${API_URL}/hotel_inventory_activity/withdrawal?start_date`;

// Hotel Assets
export function * fetchAssets() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, ASSETS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchAssetsFlow() {
  try {
    const data = yield call(fetchAssets);
    yield put(AssetsActions.assetsSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchAssetsFlow(state) {
  yield * takeLatest(AssetsTypes.ASSETS_FETCH, fetchAssetsFlow);
}

// Hotel Virtual Assets
export function * fetchVirtualAssets() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, VIRTUAL_ASSETS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchVirtualAssetsFlow() {
  try {
    const data = yield call(fetchVirtualAssets);
    yield put(AssetsActions.virtualAssetsSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchVirtualAssetsFlow(state) {
  yield * takeLatest(AssetsTypes.VIRTUAL_ASSETS_FETCH, fetchVirtualAssetsFlow);
}

// Hotel Asset Rooms
export function * fetchAssetRooms() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, ASSET_ROOMS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchAssetRoomsFlow() {

  try {
    const data = yield call(fetchAssetRooms);
    yield put(AssetsActions.assetRoomsSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchAssetRoomsFlow(state) {
  yield * takeLatest(AssetsTypes.ASSET_ROOMS_FETCH, fetchAssetRoomsFlow);
}

// Hotel Custom Actions
export function * fetchCustomActions() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, CUSTOM_ACTIONS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchCustomActionsFlow() {

  try {
    const data = yield call(fetchCustomActions);
    yield put(AssetsActions.customActionsSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchCustomActionsFlow(state) {
  yield * takeLatest(AssetsTypes.CUSTOM_ACTIONS_FETCH, fetchCustomActionsFlow);
}

// Hotel Room Areas
export function * fetchRoomAreas() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, ROOM_AREAS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchRoomAreasFlow() {

  try {
    const data = yield call(fetchRoomAreas);
    yield put(AssetsActions.roomAreasSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchRoomAreasFlow(state) {
  yield * takeLatest(AssetsTypes.ROOM_AREAS_FETCH, fetchRoomAreasFlow);
}

// Hotel Inventory Withdrawals
export function * fetchInventoryWithdrawals() {
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

export function * fetchInventoryWithdrawalsFlow() {

  try {
    const data = yield call(fetchInventoryWithdrawals);
    yield put(AssetsActions.inventoryWithdrawalSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchInventoryWithdrawalsFlow(state) {
  yield * takeLatest(AssetsTypes.INVENTORY_WITHDRAWAL_FETCH, fetchInventoryWithdrawalsFlow);
}
