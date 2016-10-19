'use strict';

exports.__esModule = true;
exports.calculateGuest = calculateGuest;
exports.calculateGuestCode = calculateGuestCode;

var _object = require('lodash/object');

var _array = require('lodash/array');

var _lang = require('lodash/lang');

var _collection = require('lodash/collection');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var displayMap = {
  arrival: 'ARR',
  arrived: 'ARR',
  stay: 'STAY',
  departed: 'DEP',
  departure: 'DEP'
};

function sortCalendar(a) {
  var s = (0, _object.get)(a, 'check_out_date');
  var e = (0, _object.get)(a, 'check_out_date');

  if (!s) {
    return false;
  }
  if (!e) {
    return true;
  }

  return (0, _moment2['default'])(s) > (0, _moment2['default'])(e);
}

function momentizeDate(date) {
  if (!date) {
    return (0, _moment2['default'])();
  }

  // return moment.utc(date).add(180, 'minute');
  return (0, _moment2['default'])((0, _array.take)(date, 10).join(''));
}

function isMatchGuest(e1, e2) {
  if (!e2) {
    return false;
  }

  var first = (0, _object.get)(e1, 'name');
  var second = (0, _object.get)(e2, 'name');

  if (!first || !second) {
    return false;
  }

  if ((0, _object.get)(e1, 'checkInDate') !== (0, _object.get)(e2, 'checkInDate') || (0, _object.get)(e1, 'checkOutDate') !== (0, _object.get)(e2, 'checkOutDate')) {
    return false;
  }

  var isPartMatch = false;
  (0, _object.get)(e1, 'name').split(' ').forEach(function (e1Part) {
    (0, _object.get)(e2, 'name').split(' ').forEach(function (e2Part) {
      if (e1Part.toLowerCase() === e2Part.toLowerCase()) {
        isPartMatch = true;
      }
    });
  });

  return isPartMatch;
}

function calculateGuest(entries) {
  if (!entries || (0, _lang.isEmpty)(entries)) {
    return null;
  }

  var today = (0, _moment2['default'])((0, _moment2['default'])().format('YYYY-MM-DD'));

  entries = entries.reduce(function (pv, item) {
    function calculateScore(r) {
      var score = 0;

      score += (0, _moment2['default'])((0, _object.get)(r, 'check_out_date')).unix();
      if (r.arrival_ts) {
        score += parseInt((0, _object.get)(r, 'arrival_ts'));
      }
      if (r.departure_ts) {
        score += parseInt((0, _object.get)(r, 'departure_ts'));
      }

      return score;
    }

    var guest = (0, _object.get)(item, 'guest_name', '').trim().toLowerCase();
    var seen_guest = pv.map(function (res) {
      return (0, _object.get)(res, 'guest_name', '').trim().toLowerCase();
    });

    if (seen_guest.indexOf(guest) !== -1) {
      var comparisonIndex = seen_guest.indexOf(guest);
      var pre = calculateScore(pv[comparisonIndex]);
      var post = calculateScore(item);

      if (post > pre) {
        pv[comparisonIndex] = item;
      }
    } else {
      pv.push(item);
    }

    return pv;
  }, []);

  var mapped = entries.sort(sortCalendar).map(function (entry) {
    var guestData = {
      name: (0, _object.get)(entry, 'guest_name'),
      group: (0, _object.get)(entry, 'group_name'),
      occupants: (0, _object.get)(entry, 'occupants'),
      pmsId: (0, _object.get)(entry, 'pms_id'),
      pmsNote: (0, _object.get)(entry, 'pms_note'),
      rcNote: (0, _object.get)(entry, 'rc_note'),
      status: null,
      display: null,
      checkInDate: null,
      checkOutDate: null
    };

    var checkInDate = momentizeDate((0, _object.get)(entry, 'check_in_date'));
    var checkOutDate = momentizeDate((0, _object.get)(entry, 'check_out_date'));

    var isArrToday = checkInDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD');
    var isDepToday = checkOutDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD');

    var isArrivalExist = (0, _object.get)(entry, 'arrival_ts');
    var isDepartureExist = (0, _object.get)(entry, 'departure_ts');

    guestData.checkInDate = checkInDate.format('YYYY-MM-DD');
    guestData.checkOutDate = checkOutDate.format('YYYY-MM-DD');

    guestData.status = 'stay';

    if (isDepToday) {
      if (isDepartureExist) {
        guestData.status = 'departed';
      } else {
        guestData.status = 'departure';
      }
    }

    if (isArrToday) {
      if (isArrivalExist) {
        guestData.status = 'arrived';
      } else {
        guestData.status = 'arrival';
      }
    }

    guestData.display = displayMap[guestData.status];
    return guestData;
  });

  return mapped.reduce(function (pv, item) {
    var lastPMS = pv.length && ((0, _object.get)(pv[pv.length - 1], 'pmsId', '') || '').trim();
    var lastName = pv.length && ((0, _object.get)(pv[pv.length - 1], 'name', '') || '').trim();

    var currentPMS = item && ((0, _object.get)(item, 'pmsId', '') || '').trim();
    var currentName = item && ((0, _object.get)(item, 'name', '') || '').trim();

    var last = lastName + ':' + lastPMS;
    var current = currentName + ':' + currentPMS;

    var isLastMatch = pv.length && isMatchGuest(item, pv[pv.length - 1]);

    if (current && last !== current && !isLastMatch) {
      pv.push(item);
    }

    return pv;
  }, []);
}

function calculateGuestCode(roomCalendar, roomCalculation) {
  if (!roomCalendar || (0, _lang.isEmpty)(roomCalendar)) {
    return null;
  }

  if (!roomCalculation) {
    return null;
  }

  var f = (0, _array.first)(roomCalculation);

  if (roomCalendar.length === 1) {
    var status = (0, _object.get)(f, 'status');

    if (status === 'stay') {
      return 'stay';
    }
    if (status === 'departure' || status === 'departed') {
      return 'dep';
    }
    if (status === 'arrival' || 'arrived') {
      return 'arr';
    }

    return '';
  }

  var statuses = roomCalculation.map(function (entry) {
    var status = (0, _object.get)(entry, 'status');

    if (status === 'stay') {
      return 'stay';
    }
    if (status === 'departure' || status === 'departed') {
      return 'dep';
    }
    if (status === 'arrival' || 'arrived') {
      return 'arr';
    }

    return '';
  });

  statuses = (0, _array.uniq)(statuses);

  if ((0, _collection.includes)(statuses, 'stay')) {
    return 'stay';
  }
  if ((0, _collection.includes)(statuses, 'arr') && (0, _collection.includes)(statuses, 'dep')) {
    return 'da';
  }

  return (0, _array.last)(statuses);
}