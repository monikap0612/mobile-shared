import Pusher from 'pusher-js/react-native';
import { get } from 'lodash/object';

import RoomsActions from '../actions/rooms';
import UsersActions from '../actions/users';
import AssetsActions from '../actions/assets';
import GlitchesActions from '../actions/glitches';

const API_KEY = '02750edc36b43c0110a3';


class Socket {
  constructor(dispatch, options) {
    this.dispatch = dispatch;
    this.isActive = false;

    this.isEnableRooms = get(options, 'isEnableRooms', true);
    this.isEnableFloors = get(options, 'isEnableFloors', true);
    this.isEnableRoomStatuses = get(options, 'isEnableRoomStatuses', true);
    this.isEnableRoomHousekeepings = get(options, 'isEnableRoomHousekeepings', true);
    this.isEnablePlanning = get(options, 'isEnablePlanning', true);
    this.isEnableCalendar = get(options, 'isEnableCalendar', true);
    this.isEnableRoomNotes = get(options, 'isEnableRoomNotes', true);
    this.isEnableCatalogs = get(options, 'isEnableCatalogs', true);
    this.isEnableTasks = get(options, 'isEnableTasks', true);
    this.isEnableAssets = get(options, 'isEnableAssets', true);
    this.isEnableVirtualAssets = get(options, 'isEnableVirtualAssets', true);
    this.isEnableRoomAreas = get(options, 'isEnableRoomAreas', true);
    this.isEnableCustomActions = get(options, 'isEnableCustomActions', true);
    this.isEnableAssetRooms = get(options, 'isEnableAssetRooms', true);
    this.isEnableInventoryWithdrawal = get(options, 'isEnableInventoryWithdrawal', true);
    this.isEnableUsers = get(options, 'isEnableUsers', true);
    this.isEnableGroups = get(options, 'isEnableGroups', true);
    this.isEnableGlitches = get(options, 'isEnableGlitches', true);
  }

  activate(userId, hotelId) {
    if (!userId || !hotelId) {
      return;
    }

    const pusher = new Pusher(API_KEY);
    const channel = pusher.subscribe(hotelId);

    channel.bind('basic_room_update', this._handleRoomUpdate, this);
    channel.bind('hotel_room_update', this._handleRoomUpdate, this);
    channel.bind('hotel_room', this._handleRoomUpdate, this);
    channel.bind('update', this._handleRoomUpdate, this);

    channel.bind('hotel_floor', this._handleFloor, this);

    channel.bind('room_note', this._handleRoomNote, this);
    channel.bind('lost_found', this._handleLostFound, this);
    channel.bind('hotel_calendar', this._handleCalendar, this);
    channel.bind('hotel_catalog', this._handleCatalog, this);
    channel.bind('hotel_glitch', this._handleGlitch, this);

    channel.bind('hotel_planning', this._handlePlanning, this);
    channel.bind('attendant_planning', this._handlePlanning, this);
    channel.bind('attendant_planning_night', this._handlePlanningNight, this);
    channel.bind('runner_planning', this._handlePlanningRunner, this);
    // channel.bind('host_planning', this._handlePlanningHost, this);

    channel.bind('hotel_task', this._handleTask, this);
    channel.bind('hotel_task_schedule', this._handleTaskSchedule, this);
    channel.bind('hotel_task_schedule_block', this._handleTaskScheduleBlock, this);

    channel.bind('hotel_asset', this._handleAsset, this);
    channel.bind('hotel_virtual_asset', this._handleVirtualAsset, this);
    channel.bind('hotel_asset_one', this._handleAsset, this);
    channel.bind('hotel_virtual_asset_one', this._handleVirtualAsset, this);
    channel.bind('asset_room', this._handleAssetRoom, this);
    channel.bind('hotel_custom_actions', this._handleCustomAction, this);

    // channel.bind('attendant_planning_night', this._handlePlanningNight, this);
    // channel.bind('general_maintenance', this._handleGeneralMaintenance, this);
    // channel.bind('hotel_inventory', this._handleInventory, this);
    // channel.bind('asset_events', this._handle, this);

    this.isActive = true;
    this.userId = userId;
    this.hotelId = hotelId;
    this.pusher = pusher;
    this.channel = channel;
  }

  deactivate() {
    this.channel.unbind();
    delete this.channel;
    delete this.pusher;
  }

  _handleRoomUpdate() {
    const { isEnableRooms } = this;

    if (!isEnableRooms) {
      return;
    }

    this.dispatch(RoomsActions.roomsFetch());
  }

  _handleRoomNote() {
    const { isEnableRoomNotes } = this;

    if (!isEnableRoomNotes) {
      return;
    }

    this.dispatch(RoomsActions.roomNotesFetch());
  }

  _handleFloor() {
    const { isEnableFloors } = this;

    if (!isEnableFloors) {
      return;
    }

    this.dispatch(RoomsActions.floorsFetch());
  }

  _handleLostFound() {

  }

  _handleCalendar() {
    const { isEnableCalendar } = this;

    if (!isEnableCalendar) {
      return;
    }

    this.dispatch(RoomsActions.calendarFetch());
  }

  _handleCatalog() {
    const { isEnableCalendar } = this;

    if (!isEnableCalendar) {
      return;
    }

    this.dispatch(RoomsActions.catalogsFetch());
  }

  _handleGlitch() {
    const { isEnableGlitches } = this;

    if (!isEnableGlitches) {
      return;
    }

    this.dispatch(GlitchesActions.glitchesFetch());
  }

  _handlePlanning() {
    const { isEnablePlanning } = this;

    if (!isEnablePlanning) {
      return;
    }

    this.dispatch(RoomsActions.planningsFetch());
  }

  _handlePlanningNight() {
    const { isEnablePlanning } = this;

    if (!isEnablePlanning) {
      return;
    }

    this.dispatch(RoomsActions.planningsNightFetch());
  }

  _handlePlanningRunner() {
    const { isEnablePlanning } = this;
    console.log('Runner Planning');

    if (!isEnablePlanning) {
      return;
    }

    this.dispatch(RoomsActions.planningsRunnerFetch());
  }

  _handlePlanningHost() {

  }

  _handleTask() {
    const { isEnableTasks } = this;

    if (!isEnableTasks) {
      return;
    }

    this.dispatch(RoomsActions.tasksFetch());
  }

  _handleTaskSchedule() {

  }

  _handleTaskScheduleBlock() {

  }

  _handleAsset() {
    const { isEnableAssets } = this;

    if (!isEnableAssets) {
      return;
    }

    this.dispatch(AssetsActions.assetsFetch());
  }
  _handleVirtualAsset() {
    const { isEnableVirtualAssets } = this;

    if (!isEnableVirtualAssets) {
      return;
    }

    this.dispatch(AssetsActions.virtualAssetsFetch());
  }

  _handleAssetRoom() {
    const { isEnableAssetRooms } = this;

    if (!isEnableAssetRooms) {
      return;
    }

    this.dispatch(AssetsActions.assetRoomsFetch());
  }

  _handleCustomAction() {
    const { isEnableCustomActions } = this;

    if (!isEnableCustomActions) {
      return;
    }

    this.dispatch(AssetsActions.customActionsFetch());
  }
}

export default Socket;
