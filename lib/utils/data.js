import moment from 'moment';
import { defer, delay } from 'lodash/function';

import AuthActions from '../actions/auth';
import RoomsActions from '../actions/rooms';
import UsersActions from '../actions/users';
import AssetsActions from '../actions/assets';
import GlitchesActions from '../actions/glitches';
import BackendActions from '../actions/backend';

const CHECK_TIME = 2 * 60 * 1000;
const LONG_STALE_TIME = 60 * 240 * 1000;

class Data {
  constructor(dispatch, options) {
    this.dispatch = dispatch;
    this.isActive = false;
  }

  activate(userId, hotelId) {
    if (!userId || !hotelId) {
      return;
    }

    this.isActive = true;

    this.timer = setInterval(() => {
      this.dispatch(BackendActions.roomsBackend());
      this.dispatch(BackendActions.calendarBackend());
      this.dispatch(BackendActions.planningsBackend());
      this.dispatch(BackendActions.tasksBackend());
      this.dispatch(BackendActions.historyBackend());
    }, CHECK_TIME);

    this.load();
  }

  deactivate() {
    this.isActive = false;
    clearInterval(this.timer);
  }

  load() {
    defer(() => {
      this.dispatch(AuthActions.hotelFetch());
      this.dispatch(RoomsActions.roomsFetch());
      this.dispatch(RoomsActions.floorsFetch());
      this.dispatch(RoomsActions.roomStatusesFetch());
      this.dispatch(RoomsActions.roomHousekeepingsFetch());
      this.dispatch(RoomsActions.roomCategoriesFetch());
      this.dispatch(RoomsActions.calendarFetch());
      this.dispatch(RoomsActions.planningsFetch());
      this.dispatch(RoomsActions.planningsRunnerFetch());
      this.dispatch(RoomsActions.roomNotesFetch());
      this.dispatch(RoomsActions.catalogsFetch());
      this.dispatch(RoomsActions.tasksFetch());
      this.dispatch(RoomsActions.historyFetch());
      this.dispatch(UsersActions.usersFetch());
      this.dispatch(UsersActions.groupsFetch());
      this.dispatch(AssetsActions.assetsFetch());
      this.dispatch(AssetsActions.virtualAssetsFetch());
      this.dispatch(AssetsActions.assetRoomsFetch());
      this.dispatch(AssetsActions.roomAreasFetch());
      this.dispatch(AssetsActions.customActionsFetch());
      this.dispatch(AssetsActions.inventoryWithdrawalFetch());
      this.dispatch(GlitchesActions.glitchesFetch());
    });
  }
}

export default Data;
