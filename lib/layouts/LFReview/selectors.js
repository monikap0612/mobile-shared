import { createSelector } from 'reselect';
import { concat, get, sortBy, groupBy, keys } from 'lodash';
import moment from 'moment';

export const hotelLostItemsSelector = state => state.rooms.hotelLostItems;
export const hotelFoundItemsSelector = state => state.rooms.hotelFoundItems;

export const hotelLFSelector = createSelector(
  [hotelLostItemsSelector, hotelFoundItemsSelector],
  (lostItems, foundItems) => sortBy(concat(lostItems, foundItems), 'date_ts')
    .reverse()
    .map(entry => ({ ...entry, date: moment.unix(entry.date_ts).format('YYYY-MM-DD') }))
)

export const groupedHotelLFSelector = createSelector(
  [hotelLFSelector],
  (hotelLostFoundItems) => {
    const grouped = groupBy(hotelLostFoundItems, 'date');

    return keys(grouped)
      .map(date => ({ title: date, data: grouped[date], key: date }));
  }
)