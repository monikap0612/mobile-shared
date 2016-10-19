import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

import AssetsTypes from '../constants/assets'

export const INITIAL_STATE = Immutable({
  hotelAssets: [],
  hotelVirtualAssets: [],
  hotelAssetRooms: [],
  hotelCustomActions: [],
  hotelRoomAreas: [],
  hotelInventoryWithdrawals: []
})

const ACTION_HANDLERS = {
  [AssetsTypes.ASSETS_RESET]: () => {
    return INITIAL_STATE
  },
  [AssetsTypes.ASSETS_SUCCESS]: (state, { assets }) => {
    return state.set('hotelAssets', assets)
  },
  [AssetsTypes.VIRTUAL_ASSETS_SUCCESS]: (state, { virtualAssets }) => {
    return state.set('hotelVirtualAssets', virtualAssets)
  },
  [AssetsTypes.ASSET_ROOMS_SUCCESS]: (state, { assetsroom }) => {
    return state.set('hotelAssetRooms', assetsroom)
  },
  [AssetsTypes.CUSTOM_ACTIONS_SUCCESS]: (state, { customActions }) => {
    return state.set('hotelCustomActions', customActions)
  },
  [AssetsTypes.ROOM_AREAS_SUCCESS]: (state, { roomAreas }) => {
    return state.set('hotelRoomAreas', roomAreas)
  },
  [AssetsTypes.INVENTORY_WITHDRAWAL_SUCCESS]: (state, { results }) => {
    return state.set('hotelInventoryWithdrawals', results)
  }
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
