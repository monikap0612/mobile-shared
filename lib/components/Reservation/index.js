import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n';
import moment from 'moment';
import { get } from 'lodash/object';
import { last } from 'lodash/array';

import ReservationProgress from './ReservationProgress';
import ReservationNights from './ReservationNights';
import GuestSubheader from './GuestSubheader';

const dateSort = function(a, b) {
  return new Date(a.check_in_date) - new Date(b.check_in_date);
}

class Reservation extends Component {

  render() {
    const { room, style, isHideTitle } = this.props;
    
    if (!get(room, ['roomCalendar', 'length'])) {
      return null;
    }

    const lastGuest = last(get(room, ['roomCalendar']).sort(dateSort));

    let guestName = get(lastGuest, ['guest_name'], '');
    let guestOccupants = get(lastGuest, ['occupants'], 1);
    if (get(room, 'roomCalendar.length') > 1) {
      const guestsNames = get(room, 'roomCalendar', [])
        .filter(entry => !entry.departure_ts)
        .map(entry => get(entry, 'guest_name'));

      guestName = guestsNames.join(', ')

      guestOccupants = get(room, 'roomCalendar', [])
        .filter(entry => !entry.departure_ts)
        .map(entry => Number(get(entry, 'occupants')) || 1)
        .reduce((pv, i) => { pv = pv + i; return pv; }, 0);
    }
    
    const checkinDate = get(lastGuest, ['check_in_date'], '').slice(0, 10);
    const checkoutDate = get(lastGuest, ['check_out_date'], '').slice(0, 10);
    const vip = get(lastGuest, ['vip'], '')

    if (!checkinDate || !checkoutDate) {
      return null;
    }

    const mCheckin = moment(checkinDate);
    const mCheckout = moment(checkoutDate);
    const mToday = moment(moment().format('YYYY-MM-DD'));
    const totalNights = mCheckout.diff(mCheckin, 'days');
    const currentNights = mToday.diff(mCheckin, 'days');

    return (
      <View style={[style]}>
        { isHideTitle ?
          null:
          <Text style={styles.title}>{ I18n.t('attendant.components.reservation-component.reservation').toUpperCase() }</Text>
        }
        <GuestSubheader
          name={guestName}
          occupants={guestOccupants}
          vip={vip}
          style={{ marginBottom: 0 }}
          />
        <View style={styles.infoContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateDay}>
              { mCheckin.format('DD') }
            </Text>
            <Text style={styles.dateMonth}>
              { mCheckin.format('MMM').toUpperCase() }
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <ReservationProgress
              step={currentNights}
              total={totalNights}
              />
            <ReservationNights
              step={currentNights+1}
              total={totalNights}
              />
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateDay}>
              { mCheckout.format('DD') }
            </Text>
            <Text style={styles.dateMonth}>
              { mCheckout.format('MMM').toUpperCase() }
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  title: {
    marginLeft: 15,
    marginBottom: 2,
    color: '#373737',
    fontWeight: '500',
    opacity: .8
  },
  infoContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 8,
    paddingTop: 4,
  },
  dateContainer: {
    alignItems: 'center'
  },
  dateDay: {
    color: '#373737',
    fontSize: 28,
    fontWeight: 'bold'
  },
  dateMonth: {
    color: '#373737',
    fontSize: 15,
    fontWeight: 'bold'
  },
  progressContainer: {
    flexGrow: 1
  }
});

export default Reservation;
