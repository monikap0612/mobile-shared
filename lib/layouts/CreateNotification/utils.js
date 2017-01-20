import { find } from 'lodash/collection';

export const buildNotifications = (values, users) => {
  const { user, locations: selectedLocations, message, photo: selectedPhoto } = values;
  const selectedValue = user.value;
  const isAnySelectedGroups = user.isGroup

  let notifications = [];
  let locations = selectedLocations;
  const photo = selectedPhoto || {};

  if (!locations && selectedValue !== 'planned') {
    locations = [null]
  }

  if (selectedValue === 'planned') {
    notifications = locations.filter(room => !!room.plannedUser)
      .map(room => ({ message, photoUrl: photo.path, photoId: photo.id, room, user: room.plannedUser }));
  } else if (selectedValue === 'maintenance') {
    locations.map(room => {
      users.forEach(user => {
        if (!user.isMaintenance) {
          return;
        }
        notifications.push({ message, photoUrl: photo.path, photoPath: photo.id, room, user });
      })
    })
  } else if (selectedValue === 'runners') {
    locations.map(room => {
      users.forEach(user => {
        if (!user.isRoomRunner) {
          return;
        }
        notifications.push({ message, photoUrl: photo.path, photoPath: photo.id, room, user });
      });
    });
  } else if (selectedValue === 'inspectors') {
    locations.map(room => {
      users.forEach(user => {
        if (!user.isInspector) {
          return;
        }
        notifications.push({ message, photoUrl: photo.path, photoPath: photo.id, room, user });
      });
    });
  } else if (isAnySelectedGroups) {
    user.users.forEach(userId => {
      const user = find(users, { _id: userId });
      locations.map(room => {
        notifications.push({ message, photoUrl: photo.path, photoPath: photo.id, room, user });
      });
    });
  } else {
    locations.map(room => {
      notifications.push({ message, photoUrl: photo.path, photoPath: photo.id, room, user });
    });
  }

  return notifications
}
