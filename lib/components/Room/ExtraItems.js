import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { get, first, last } from 'lodash';
import { unixPrettyTime, prettyDate } from '../../utils/dates';

import {
  ExtraRow,
  ExtraRowValue,
  ExtraRowLabel,
  ExtraRowContainer
} from './styles'

export default ExtraItems = ({ room, isAttendant, isRunner }) => {
  if (!get(room, 'guests.length', 0)) {
    return null;
  }

  const { guests, guestStatus } = room;

  let eta = null;
  let etd = null;
  let breakfast = null;
  let features = null;

  if (guestStatus === "da" && guests.length > 1) {
    etd = get(first(guests), 'etd');
    eta = get(last(guests), 'eta');
    // features = get(last(guests), 'guest.room_features');
  } else if (guestStatus === "arr") {
    eta = get(first(guests), 'eta');
    // features = get(first(guests), 'guest.room_features');
  } else if (guestStatus === "dep") {
    etd = get(last(guests), 'etd');
    // features = get(last(guests), 'guest.room_features');
  } else if (guestStatus === "stay") {
    // features = get(first(guests), 'guest.room_features');
  }

  if (isRunner && get(first(guests), 'guest.breakfast')) {
    breakfast = get(first(guests), 'guest.breakfast');
  }

  if (!eta && !etd && !features && !breakfast) {
    return null;
  }

  return (
    <ExtraRow>
      { eta ?
        <ExtraRowContainer>
          <ExtraRowLabel>ETA</ExtraRowLabel>
          <ExtraRowValue>{ eta && unixPrettyTime(eta) }</ExtraRowValue>
        </ExtraRowContainer>
        : null
      }

      { etd ?
        <ExtraRowContainer>
          <ExtraRowLabel>ETD</ExtraRowLabel>
          <ExtraRowValue>{ etd && unixPrettyTime(etd) }</ExtraRowValue>
        </ExtraRowContainer>
        : null
      }

      { features ? 
        <ExtraRowContainer>
          <Icons name="user-plus" color="#4a4a4a" size={11} style={{ opacity: .7, marginRight: 4 }} />
          <ExtraRowValue>{ features }</ExtraRowValue>
        </ExtraRowContainer>
        : null
      }

      { breakfast ?
        <ExtraRowContainer>
          <MaterialIcons name="free-breakfast" color="#4a4a4a" size={11} style={{ opacity: .7, marginRight: 4 }} />
          <ExtraRowValue>{ breakfast }</ExtraRowValue>
        </ExtraRowContainer>
        : null
      }
    </ExtraRow>
  )
}