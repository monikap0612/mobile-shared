'use strict';

exports.__esModule = true;

exports['default'] = function (assignments, users, groups) {
  var meta = {},
      assigned = {};
  var labels = [],
      ids = [];
  var indexedUsers = (0, _collection.keyBy)(users, '_id');
  var indexGroups = (0, _collection.keyBy)(groups, '_id');
  var groupUsers = [];
  assignments.forEach(function (groupId) {
    var foundGroup = (0, _object.get)(indexGroups, groupId);
    if (!foundGroup) {
      return;
    }

    (0, _object.get)(foundGroup, 'users', []).forEach(function (userId) {
      var foundUser = (0, _object.get)(indexedUsers, userId);
      if (!foundUser) {
        return;
      }

      if ((0, _object.get)(foundUser, 'isAttendant') || (0, _object.get)(foundUser, 'isInspector')) {
        meta.isHousekeeping = true;
      } else if ((0, _object.get)(foundUser, 'isRunner')) {
        meta.isHousekeeping = true;
        meta.isConcierge = true;
      } else if ((0, _object.get)(foundUser, 'isMaintenance')) {
        meta.isMaintenance = true;
      } else if ((0, _object.get)(foundUser, 'isReceptionist')) {
        meta.isConcierge = true;
      }

      ids.push(userId);
    });
    labels.push(foundGroup.name);
  });

  assignments.forEach(function (userId) {
    if (userId === 'planned') {
      meta.isHousekeeping = true;
      assigned.isPlannedAttendant = true;
      labels.push('Planned Attendant');
      return;
    }

    if (userId === 'runner') {
      meta.isHousekeeping = true;
      meta.isConcierge = true;
      assigned.isPlannedRunner = true;
      labels.push('Planned Runner');
      return;
    }

    if (userId === 'maintenance team') {
      meta.isMaintenance = true;
      labels.push('Maintenance Team');
      return;
    }

    var foundUser = (0, _object.get)(indexedUsers, userId);
    if (!foundUser) {
      return;
    }

    labels.push((0, _object.get)(foundUser, 'first_name') + ' ' + (0, _object.get)(foundUser, 'last_name'));
    ids.push((0, _object.get)(foundUser, '_id'));

    if ((0, _object.get)(foundUser, 'isAttendant') || (0, _object.get)(foundUser, 'isInspector')) {
      meta.isHousekeeping = true;
    } else if ((0, _object.get)(foundUser, 'isRunner')) {
      meta.isHousekeeping = true;
      meta.isConcierge = true;
    } else if ((0, _object.get)(foundUser, 'isMaintenance')) {
      meta.isMaintenance = true;
    } else if ((0, _object.get)(foundUser, 'isReceptionist')) {
      meta.isConcierge = true;
    }
  });

  assigned.label = labels.join(', ');
  assigned.user_ids = (0, _array.uniq)(ids);

  return {
    meta: meta,
    assigned: assigned
  };
};

var _collection = require('lodash/collection');

var _array = require('lodash/array');

var _object = require('lodash/object');