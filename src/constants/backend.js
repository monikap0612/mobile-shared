import { createTypes } from 'reduxsauce';

export default createTypes(`
  ROOMS_FETCHED
  FLOORS_FETCHED
  ROOM_STATUSES_FETCHED
  ROOM_HOUSEKEEPINGS_FETCHED
  CALENDAR_FETCHED
  PLANNINGS_FETCHED
  ROOM_NOTES_FETCHED
  CATALOGS_FETCHED
  TASKS_FETCHED
  ASSETS_FETCHED
  VIRTUAL_ASSETS_FETCHED
  ROOM_AREAS_FETCHED
  CUSTOM_ACTIONS_FETCHED
  ASSET_ROOMS_FETCHED
  INVENTORY_WITHDRAWAL_FETCHED
  USERS_FETCHED
  GROUPS_FETCHED
  GLITCHES_FETCHED
`);
