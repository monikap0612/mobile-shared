import BackendTypes from '../constants/backend';

export function roomsFetched() {
  return {
    type: BackendTypes.ROOMS_FETCHED
  }
}

export function floorsFetched() {
  return {
    type: BackendTypes.FLOORS_FETCHED
  }
}

export function roomStatusesFetched() {
  return {
    type: BackendTypes.ROOM_STATUSES_FETCHED
  }
}

export function roomHousekeepingsFetched() {
  return {
    type: BackendTypes.ROOM_HOUSEKEEPINGS_FETCHED
  }
}

export function calendarFetched() {
  return {
    type: BackendTypes.CALENDAR_FETCHED
  }
}

export function planningsFetched() {
  return {
    type: BackendTypes.PLANNINGS_FETCHED
  }
}

export function roomNotesFetched() {
  return {
    type: BackendTypes.ROOM_NOTES_FETCHED
  }
}

export function catalogsFetched() {
  return {
    type: BackendTypes.CATALOGS_FETCHED
  }
}

export function tasksFetched() {
  return {
    type: BackendTypes.TASKS_FETCHED
  }
}

export function assetsFetched() {
  return {
    type: BackendTypes.ASSETS_FETCHED
  }
}

export function virtualAssetsFetched() {
  return {
    type: BackendTypes.VIRTUAL_ASSETS_FETCHED
  }
}

export function roomAreasFetched() {
  return {
    type: BackendTypes.ROOM_AREAS_FETCHED
  }
}

export function customActionsFetched() {
  return {
    type: BackendTypes.CUSTOM_ACTIONS_FETCHED
  }
}

export function assetRoomsFetched() {
  return {
    type: BackendTypes.ASSET_ROOMS_FETCHED
  }
}

export function inventoryWithdrawalFetched() {
  return {
    type: BackendTypes.INVENTORY_WITHDRAWAL_FETCHED
  }
}

export function usersFetched() {
  return {
    type: BackendTypes.USERS_FETCHED
  }
}

export function groupsFetched() {
  return {
    type: BackendTypes.GROUPS_FETCHED
  }
}

export function glitchesFetched() {
  return {
    type: BackendTypes.GLITCHES_FETCHED
  }
}

export function roomsBackend() {
  return {
    type: BackendTypes.ROOMS_BACKEND
  }
}

export function calendarBackend() {
  return {
    type: BackendTypes.CALENDAR_BACKEND
  }
}

export function planningsBackend() {
  return {
    type: BackendTypes.PLANNINGS_BACKEND
  }
}

export function tasksBackend() {
  return {
    type: BackendTypes.TASKS_BACKEND
  }
}

export default {
  roomsFetched,
  floorsFetched,
  roomStatusesFetched,
  roomHousekeepingsFetched,
  calendarFetched,
  planningsFetched,
  roomNotesFetched,
  catalogsFetched,
  tasksFetched,
  assetsFetched,
  virtualAssetsFetched,
  roomAreasFetched,
  customActionsFetched,
  assetRoomsFetched,
  inventoryWithdrawalFetched,
  usersFetched,
  groupsFetched,
  glitchesFetched,
  roomsBackend,
  calendarBackend,
  planningsBackend,
  tasksBackend
}
