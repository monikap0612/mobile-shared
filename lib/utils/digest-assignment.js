import { keyBy, includes } from 'lodash/collection';
import { uniq } from 'lodash/array';
import { get } from 'lodash/object';

export default function(assignments, users, groups) {
  const meta = {}, assigned = {};
  const labels = [], ids = [];
  const indexedUsers = keyBy(users, '_id');
  const indexGroups = keyBy(groups, '_id');
  const groupUsers = [];
  assignments.forEach(groupId => {
    const foundGroup = get(indexGroups, groupId);
    if (!foundGroup) {
      return;
    }

    get(foundGroup, 'users', []).forEach(userId => {
      const foundUser = get(indexedUsers, userId);
      if (!foundUser) {
        return;
      }

      if (get(foundUser, 'isAttendant') || get(foundUser, 'isInspector')) {
        meta.isHousekeeping = true;
      } else if (get(foundUser, 'isRoomRunner')) {
        meta.isHousekeeping = true;
        meta.isConcierge = true;
      } else if (get(foundUser, 'isMaintenance')) {
        meta.isMaintenance = true;
      } else if (get(foundUser, 'isReceptionist')) {
        meta.isConcierge = true;
      }

      ids.push(userId);
    });
    labels.push(foundGroup.name);
  });

  assignments.forEach(userId => {
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

    const foundUser = get(indexedUsers, userId);
    if (!foundUser) {
      return;
    }

    labels.push(`${get(foundUser, 'first_name')} ${get(foundUser, 'last_name')}`);
    ids.push(get(foundUser, '_id'));

    if (get(foundUser, 'isAttendant') || get(foundUser, 'isInspector')) {
      meta.isHousekeeping = true;
    } else if (get(foundUser, 'isRoomRunner')) {
      meta.isHousekeeping = true;
      meta.isConcierge = true;
    } else if (get(foundUser, 'isMaintenance')) {
      meta.isMaintenance = true;
    } else if (get(foundUser, 'isReceptionist')) {
      meta.isConcierge = true;
    }
  })

  assigned.label = labels.join(', ');
  assigned.user_ids = uniq(ids);

  return {
    meta,
    assigned
  };
}
