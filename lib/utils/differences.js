import { isEmpty } from 'lodash/lang';

export const rooms = (prev, next) => {
  let updates = {
    cleanings: [],
    messages: [],
    unblocks: [],
    restocks: [],
  }
  next.forEach(room => {
    const previous = prev.find(p => p._id === room._id)
    if (!previous) {
      return false
    }
    if (previous.comment !== room.comment && !isEmpty(room.comment)) {
      updates.cleanings.push(room);
    }
    if (previous.isRoomBlocked && !room.isRoomBlocked) {
      updates.unblocks.push(room);
    }
    if (!previous.isRoomRestocked && room.isRoomRestocked) {
      updates.restocks.push(room);
    }
  });

  return updates;
}

export const plannings = (prev, next) => {
  let updates = {
    priorities: [],
    overwrites: []
  }
  next.forEach(planning => {
    const previous = prev.find(p => p.room_id === planning.room_id)
    if (!previous) {
      return false
    }
    if (!previous.is_priority && planning.is_priority) {
      updates.priorities.push(planning);
    }
  })

  return updates;
}

export const calendar = (prev, next) => {
  let updates = {
    checkins: [],
    checkouts: []
  }
  next.forEach(entry => {
    const previous = prev.find(p => p.room_id === entry.room_id)
    if (!previous) {
      return false
    }
    if (!previous.arrival_ts && entry.arrival_ts) {
      updates.checkins.push(entry);
    }
    if (!previous.departure_ts && entry.departure_ts) {
      updates.checkouts.push(entry);
    }
  });

  return updates;
}
