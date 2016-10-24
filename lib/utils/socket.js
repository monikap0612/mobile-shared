'use strict';

exports.__esModule = true;

var _reactNative = require('pusher-js/react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _object = require('lodash/object');

var _rooms = require('../actions/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _users = require('../actions/users');

var _users2 = _interopRequireDefault(_users);

var _assets = require('../actions/assets');

var _assets2 = _interopRequireDefault(_assets);

var _glitches = require('../actions/glitches');

var _glitches2 = _interopRequireDefault(_glitches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API_KEY = '02750edc36b43c0110a3';

var Socket = function () {
  function Socket(dispatch, options) {
    _classCallCheck(this, Socket);

    this.dispatch = dispatch;
    this.isActive = false;

    this.isEnableRooms = (0, _object.get)(options, 'isEnableRooms', true);
    this.isEnableFloors = (0, _object.get)(options, 'isEnableFloors', true);
    this.isEnableRoomStatuses = (0, _object.get)(options, 'isEnableRoomStatuses', true);
    this.isEnableRoomHousekeepings = (0, _object.get)(options, 'isEnableRoomHousekeepings', true);
    this.isEnablePlanning = (0, _object.get)(options, 'isEnablePlanning', true);
    this.isEnableCalendar = (0, _object.get)(options, 'isEnableCalendar', true);
    this.isEnableRoomNotes = (0, _object.get)(options, 'isEnableRoomNotes', true);
    this.isEnableCatalogs = (0, _object.get)(options, 'isEnableCatalogs', true);
    this.isEnableTasks = (0, _object.get)(options, 'isEnableTasks', true);
    this.isEnableAssets = (0, _object.get)(options, 'isEnableAssets', true);
    this.isEnableVirtualAssets = (0, _object.get)(options, 'isEnableVirtualAssets', true);
    this.isEnableRoomAreas = (0, _object.get)(options, 'isEnableRoomAreas', true);
    this.isEnableCustomActions = (0, _object.get)(options, 'isEnableCustomActions', true);
    this.isEnableAssetRooms = (0, _object.get)(options, 'isEnableAssetRooms', true);
    this.isEnableInventoryWithdrawal = (0, _object.get)(options, 'isEnableInventoryWithdrawal', true);
    this.isEnableUsers = (0, _object.get)(options, 'isEnableUsers', true);
    this.isEnableGroups = (0, _object.get)(options, 'isEnableGroups', true);
    this.isEnableGlitches = (0, _object.get)(options, 'isEnableGlitches', true);
  }

  Socket.prototype.activate = function activate(userId, hotelId) {
    if (!userId || !hotelId) {
      return;
    }

    var pusher = new _reactNative2['default'](API_KEY);
    var channel = pusher.subscribe(hotelId);

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
  };

  Socket.prototype.deactivate = function deactivate() {
    this.channel.unbind();
    delete this.channel;
    delete this.pusher;
  };

  Socket.prototype._handleRoomUpdate = function _handleRoomUpdate() {
    var isEnableRooms = this.isEnableRooms;


    if (!isEnableRooms) {
      return;
    }

    this.dispatch(_rooms2['default'].roomsFetch());
  };

  Socket.prototype._handleRoomNote = function _handleRoomNote() {
    var isEnableRoomNotes = this.isEnableRoomNotes;


    if (!isEnableRoomNotes) {
      return;
    }

    this.dispatch(_rooms2['default'].roomNotesFetch());
  };

  Socket.prototype._handleFloor = function _handleFloor() {
    var isEnableFloors = this.isEnableFloors;


    if (!isEnableFloors) {
      return;
    }

    this.dispatch(_rooms2['default'].floorsFetch());
  };

  Socket.prototype._handleLostFound = function _handleLostFound() {};

  Socket.prototype._handleCalendar = function _handleCalendar() {
    var isEnableCalendar = this.isEnableCalendar;


    if (!isEnableCalendar) {
      return;
    }

    this.dispatch(_rooms2['default'].calendarFetch());
  };

  Socket.prototype._handleCatalog = function _handleCatalog() {
    var isEnableCalendar = this.isEnableCalendar;


    if (!isEnableCalendar) {
      return;
    }

    this.dispatch(_rooms2['default'].catalogsFetch());
  };

  Socket.prototype._handleGlitch = function _handleGlitch() {
    var isEnableGlitches = this.isEnableGlitches;


    if (!isEnableGlitches) {
      return;
    }

    this.dispatch(_glitches2['default'].glitchesFetch());
  };

  Socket.prototype._handlePlanning = function _handlePlanning() {
    var isEnablePlanning = this.isEnablePlanning;


    if (!isEnablePlanning) {
      return;
    }

    this.dispatch(_rooms2['default'].planningsFetch());
  };

  Socket.prototype._handlePlanningNight = function _handlePlanningNight() {
    var isEnablePlanning = this.isEnablePlanning;


    if (!isEnablePlanning) {
      return;
    }

    this.dispatch(_rooms2['default'].planningsNightFetch());
  };

  Socket.prototype._handlePlanningRunner = function _handlePlanningRunner() {
    var isEnablePlanning = this.isEnablePlanning;

    console.log('Runner Planning');

    if (!isEnablePlanning) {
      return;
    }

    this.dispatch(_rooms2['default'].planningsRunnerFetch());
  };

  Socket.prototype._handlePlanningHost = function _handlePlanningHost() {};

  Socket.prototype._handleTask = function _handleTask() {
    var isEnableTasks = this.isEnableTasks;


    if (!isEnableTasks) {
      return;
    }

    this.dispatch(_rooms2['default'].tasksFetch());
  };

  Socket.prototype._handleTaskSchedule = function _handleTaskSchedule() {};

  Socket.prototype._handleTaskScheduleBlock = function _handleTaskScheduleBlock() {};

  Socket.prototype._handleAsset = function _handleAsset() {
    var isEnableAssets = this.isEnableAssets;


    if (!isEnableAssets) {
      return;
    }

    this.dispatch(_assets2['default'].assetsFetch());
  };

  Socket.prototype._handleVirtualAsset = function _handleVirtualAsset() {
    var isEnableVirtualAssets = this.isEnableVirtualAssets;


    if (!isEnableVirtualAssets) {
      return;
    }

    this.dispatch(_assets2['default'].virtualAssetsFetch());
  };

  Socket.prototype._handleAssetRoom = function _handleAssetRoom() {
    var isEnableAssetRooms = this.isEnableAssetRooms;


    if (!isEnableAssetRooms) {
      return;
    }

    this.dispatch(_assets2['default'].assetRoomsFetch());
  };

  Socket.prototype._handleCustomAction = function _handleCustomAction() {
    var isEnableCustomActions = this.isEnableCustomActions;


    if (!isEnableCustomActions) {
      return;
    }

    this.dispatch(_assets2['default'].customActionsFetch());
  };

  return Socket;
}();

exports['default'] = Socket;