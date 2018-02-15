import get from 'lodash/get';
import find from 'lodash/find';

const ALL_RESERVATIONS = ['arrived', 'departure', 'arrival', 'departed', 'stay'];
const UPCOMING_RESERVATIONS = ['arrival', 'arrived', 'stay', 'departure', 'departed'];

const pickActiveReservation = (guests, isUpcoming = false) => {
  let activeId = null;
  const statuses = isUpcoming
    ? ALL_RESERVATIONS
    : UPCOMING_RESERVATIONS;
  
  for (let status of statuses) {
    const found = find(guests, { status });
    if (found) {
      activeId = get(found, 'pmsId');
      break;
    }
  }
  
  return activeId;
}

export default pickActiveReservation;