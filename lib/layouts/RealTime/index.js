import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n'
import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { Selectors as OfflineSelectors, Actions as OfflineActions } from '../../offline';
import { Actions as NetworkActions, Selectors as NetworkSelectors } from '../../network';
import { offlineOutboxSelector, offlineRetrySelector, outboundFailedSelector } from './selectors';
import {
  margin,
  padding,
  red,
  white,
  notificationSuccess,
  notificationInfo,
  notificationWarning,
  notificationDanger
} from '../../styles';

const OnlineGood = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={[styles.realTimeContainer, notificationSuccess.bg]} onPress={onPress}>
      {/* <Spinner style={[margin.r5]} isVisible={true} size={24} type={'Wave'} color={"#FFFFFF"}/> */}
      <Entypo name="signal" size={24} color="white" style={[margin.r10]} />
      <Text style={styles.realTimeText}>No problems</Text>
    </TouchableOpacity>
  </View>
)

const OnlineRunning = ({ onPress, itemsToSync }) => (
  <View style={styles.container}>
    <TouchableOpacity style={[styles.realTimeContainer, notificationInfo.bg]} onPress={onPress}>
      <Spinner style={[margin.r5]} isVisible={true} size={24} type={'Wave'} color={"#FFFFFF"}/>
      <Text style={styles.realTimeText}>{ I18n.t('base.realtime.index.pending-requests-itemstosync') }: { itemsToSync }</Text>
    </TouchableOpacity>
  </View>
)

const OnlineWarning = ({ onPress, itemsToSync }) => (
  <View style={styles.container}>
    <TouchableOpacity style={[styles.realTimeContainer, notificationWarning.bg]} onPress={onPress}>
      <Spinner style={[margin.r5]} isVisible={true} size={24} type={'Wave'} color={"#FFFFFF"}/>
      <Text style={styles.realTimeText}>{ I18n.t('base.realtime.index.pending-requests-itemstosync') }: { itemsToSync } {`· Some network issues`}</Text>
    </TouchableOpacity>
  </View>
)

const OnlineError = ({ onPress, failedItems }) => (
  <View style={styles.container}>
    <TouchableOpacity style={[styles.realTimeContainer, notificationDanger.bg]} onPress={onPress}>
      <Icon name="exclamation-triangle" size={24} color="white" style={[margin.r10]} />
      <Text style={styles.realTimeText}>{ `Failed items: ${failedItems.length}` }</Text>
    </TouchableOpacity>
  </View>
)

class RealTimeLayout extends Component {

  _handleForce = () => {
    const { queue } = this.props;

    if (!queue || !queue.length) {
      return;
    }
    // console.log('forced offline', queue);

    this.props.forceOffline();
  }

  render() {
    const { network, queue, outbox, meta, retryCount, outboundFailed, isHidePending } = this.props;
    const isOffline = !network.isOnline;
    const itemsToSync = queue.length + outbox.length;
    
    if (!isOffline && itemsToSync && retryCount < 3) {
      return <OnlineRunning onPress={() => null} itemsToSync={itemsToSync} />
    }
    
    if (!isOffline && itemsToSync) {
      return <OnlineWarning onPress={() => null} itemsToSync={itemsToSync} />
    }
    
    if (!isOffline && outboundFailed && outboundFailed.length) {
      return <OnlineError onPress={() => null} failedItems={outboundFailed} />
    }
    
    if (!isOffline && !itemsToSync) {
      return <OnlineGood onPress={() => null} />
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.realTimeContainer} onPress={this._handleForce}>
          { isOffline ? <Text style={styles.realTimeText}>{ I18n.t('base.realtime.index.offline').toUpperCase() }</Text> : null }
          { isOffline && itemsToSync && !isHidePending ? <Text style={styles.realTimeText}> - </Text> : null }
          { itemsToSync && !isHidePending ? <Text style={styles.realTimeText}>{ I18n.t('base.realtime.index.pending-requests-itemstosync') }: { itemsToSync } {`· Some network issues`}</Text> : null }
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // bottom: 20,
    // left: 20
  },
  realTimeContainer: {
    height: 38,
    ...padding.x10,
    flexDirection: 'row',
    alignItems: 'center',
    ...red.bg,
    // borderRadius: 4
  },
  realTimeText: {
    ...white.text,
    fontSize: 14
  }
});

const mapStateToProps = createStructuredSelector({
  queue: OfflineSelectors.offlineQueueSelector,
  meta: OfflineSelectors.offlineMetaSelector,
  network: NetworkSelectors.network,
  outbox: offlineOutboxSelector,
  retryCount: offlineRetrySelector,
  outboundFailed: outboundFailedSelector
});

const mapDispatchToProps = (dispatch) => {
  return {
    forceOffline: () => dispatch(OfflineActions.start()),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeLayout);
