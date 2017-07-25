import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { Selectors as OfflineSelectors, Actions as OfflineActions } from '../../offline';
import { Actions as NetworkActions, Selectors as NetworkSelectors } from '../../network';
import {
  padding,
  red,
  white
} from '../../styles';

class RealTimeLayout extends Component {

  _handleForce = () => {
    const { queue } = this.props;

    if (!queue || !queue.length) {
      return;
    }
    console.log('forced offline', queue);

    this.props.forceOffline();
  }

  render() {
    const { network, queue, meta, isHidePending } = this.props;
    const isOffline = !network.isOnline;
    const itemsToSync = queue.length;

    if (!isOffline && !itemsToSync) {
      return null;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.realTimeContainer} onPress={this._handleForce}>
          { isOffline ? <Text style={styles.realTimeText}>{ I18n.t('base.realtime.index.offline').toUpperCase() }</Text> : null }
          { isOffline && itemsToSync && !isHidePending ? <Text style={styles.realTimeText}> - </Text> : null }
          { itemsToSync && !isHidePending ? <Text style={styles.realTimeText}>{ I18n.t('base.realtime.index.pending-requests-itemstosync') }: { itemsToSync }</Text> : null }
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  realTimeContainer: {
    height: 40,
    ...padding.x10,
    flexDirection: 'row',
    alignItems: 'center',
    ...red.bg,
    borderRadius: 4
  },
  realTimeText: {
    ...white.text,
    fontSize: 17
  }
});

const mapStateToProps = createStructuredSelector({
  queue: OfflineSelectors.offlineQueueSelector,
  meta: OfflineSelectors.offlineMetaSelector,
  network: NetworkSelectors.network,
});

const mapDispatchToProps = (dispatch) => {
  return {
    forceOffline: () => dispatch(OfflineActions.start()),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeLayout);
