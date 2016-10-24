import BackendTypes from '../constants/backend';

export function roomsFetched() {
  return {
    type: BackendTypes.ROOMS_FETCHED
  }
}

export default {
  roomsFetched,
}
