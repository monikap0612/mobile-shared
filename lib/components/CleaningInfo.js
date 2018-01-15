import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n'

import Icon from 'react-native-vector-icons/FontAwesome';
import { get, has } from 'lodash/object';
import {
  grey400,
  red
} from 'rc-mobile-base/lib/styles';

CUSTOM_CLEAN_MAP = {
  lc: "Light Clean",
  sc: "Standard Clean",
  dc: "Deep Clean"
}

const CustomStatus = ({ status }) => {
  if (!has(CUSTOM_CLEAN_MAP, status)) {
    return null;
  }

  return (
    <View style={styles.infoRow}>
      <View style={styles.iconContainer}>
        <Text style={styles.pms}>CLN</Text>
      </View>
      <Text style={styles.infoText}>{ get(CUSTOM_CLEAN_MAP, status) }</Text>
    </View>
  )
}

const ChangeSheets = () => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Icon name="bed" size={18} color='#C93C46' />
    </View>
    <Text style={styles.infoText}>{ I18n.t('attendant.clean.cleaninginfo.change-sheets') }</Text>
  </View>
)

const LongStay = () => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Text style={[styles.pms, red.text]}>LS</Text>
    </View>
    <Text style={styles.infoText}>{ I18n.t('attendant.clean.cleaninginfo.long-stay') }</Text>
  </View>
)

const Vip = ({ vip }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Icon name="star" size={18} color='#F5A623' />
    </View>
    <Text style={styles.infoText}>{ vip || 'VIP' }</Text>
  </View>
)

const PmsNote = ({ note }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Text style={styles.pms}>{ I18n.t('attendant.clean.cleaninginfo.pms') }</Text>
    </View>
    <Text style={styles.infoText} numberOfLines={4}>{ note }</Text>
  </View>
)

const RoomCategory = ({ roomCategory }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Icon name="suitcase" size={18} color='#4a4a4a' />
    </View>
    <Text style={styles.infoText}>{ roomCategory }</Text>
  </View>
)

const Description = ({ description }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Icon name="info" size={18} color='#4a4a4a' />
    </View>
    <Text style={styles.infoText} numberOfLines={4}>{ description }</Text>
  </View>
)

const Message = ({ message }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Icon name="envelope" size={18} color='#4a4a4a' />
    </View>
    <Text style={styles.infoText}>{ message || '' }</Text>
  </View>
)

const Credits = ({ credits }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Text style={styles.pms}>{ I18n.t('attendant.clean.cleaninginfo.credits') }</Text>
    </View>
    <Text style={styles.infoText}>{ credits }</Text>
  </View>
)

const advancedMessageIcon = (type) => {
  if (type === "day") {
    return <Icon name="sun-o" size={18} color='#4a4a4a' />
  } else if (type === "night") {
    return <Icon name="moon-o" size={18} color='#4a4a4a' />
  } else if (type === "pu") {
    return <Text style={[styles.pms, { color: '#4a4a4a' }]}>PU</Text>
  } else {
    return <Icon name="envelope" size={18} color='#4a4a4a' />
  }
}

const AdvancedMessages = ({ messages }) => {
  return (
    <View>
      { messages.map(message =>
        <View style={styles.infoRow} key={message.messageId}>
          <View style={styles.iconContainer}>
            { advancedMessageIcon(message.messageType) }
          </View>
          <Text style={styles.infoText}>{ message.message || '' }</Text>
        </View>
      )}
    </View>
  )
}

const CleaningInfo = ({ room, config, style }) => {
  if (!room) {
    return null;
  }
  // console.log(config)

  const isChangeSheets = get(room, 'isChangeSheets', false);
  const isLongStay = get(room, 'isLongStay', false);
  const vip = get(room, ['roomCalendar', 0, 'vip'], null);
  const pmsNote = get(room, ['roomCalendar', 0, 'pms_note'], null);
  const message = get(room, 'comment');
  const messages = get(room, 'messages');
  const credits = !config.isHideAttendantCredits && get(room, 'roomCredits');
  const roomCategory = get(room, 'roomCategory.label', '');
  const description = get(room, 'description');
  const customStatus = get(room, 'roomPlanning.guest_status');

  if (!isChangeSheets && !vip && !pmsNote && !message && !credits) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.infoHeader}>{ I18n.t('attendant.clean.cleaninginfo.cleaning-info').toUpperCase() }</Text>
        <View style={styles.infoContainer}>

          { customStatus ?
            <CustomStatus status={customStatus} />
            : null
          }

          { isChangeSheets ?
            <ChangeSheets />
            : null
          }

          { isLongStay ?
            <LongStay />
            : null
          }

          { vip ?
            <Vip vip={vip} />
            : null
          }

          { pmsNote ?
            <PmsNote note={pmsNote} />
            : null
          }

          { message && !config.isEnableAdvancedMessages ?
            <Message message={message} />
            : null
          }

          { messages && config.isEnableAdvancedMessages ?
            <AdvancedMessages messages={messages} />
            : null
          }

          {
            roomCategory ?
            <RoomCategory roomCategory={roomCategory} />
            : null
          }
          
          {
            credits ?
            <Credits credits={credits} />
            : null
          }

          {
            description ?
            <Description description={description} />
            : null
          }

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  infoHeader: {
    marginLeft: 15,
    marginBottom: 2,
    color: '#373737',
    fontWeight: '500',
    opacity: .8
  },
  infoContainer: {
    backgroundColor: 'white',
    marginLeft: 4,
    marginRight: 4,
  },
  infoRow: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 54
  },
  infoText: {
    color: '#4a4a4a',
    fontWeight: '300',
    fontSize: 14,
    flex: 1,
    flexDirection: 'column'
  },
  pms: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4a4a4a'
  },
});

export default CleaningInfo;