import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

import checkEqual from 'rc-mobile-base/lib/utils/check-equal';

class InventoryUpdateRow extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !checkEqual(this.props, nextProps, 'data.update');
  }

  render() {
    const { data, index, adjustInventory, resetInventory, onScroll } = this.props;
    const isUpdate = !!data.update;
    const count = (isFinite(Number(data.assetStatus)) ? Number(data.assetStatus) : 0)  - (data.update || 0);

    const swipeoutBtns = [
      { text: 'Reset', backgroundColor: '#E8AC4D', onPress: () => resetInventory(data) }
    ];

    return (
      <Swipeable
        onSwipeStart={() => onScroll(false)}
        onSwipeRelease={() => onScroll(true)}
        leftButtons={swipeoutBtns}>
        <View style={[styles.container, { backgroundColor: index % 2 ? '#F7F7F7' : '#EDEDED' }]}>
          <View style={styles.imageContainer}>
            <Image style={styles.assetImage} source={{ uri: data.asset.image }} />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{ data.asset.name }</Text>
            <Text style={[styles.labelCount, isUpdate ? styles.activeLabelCount : null]}>{ count }</Text>
            </View>
          <View style={[styles.btnContainer, { backgroundColor: data.index % 2 ? '#E2E4E5' : '#D9DBDC' }, isUpdate ? { backgroundColor: '#f0b840' } : null]}>
            <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustInventory(data)}>
              { isUpdate ?
                <Text style={styles.adjustmentText}>{ `-${data.update}` }</Text> :
                <Icon name="plus" size={30} color="white" />

              }
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  assetImage: {
    height: 60,
    width: 60
  },
  labelContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  labelText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4a4a4a'
  },
  labelCount: {
    marginLeft: 10,
    backgroundColor: '#3F81BA',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 1,
    color: 'white'
  },
  btnContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  adjustBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  activeLabelCount: {
    backgroundColor: 'green'
  },
  adjustmentText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '800'
  }
});

export default InventoryUpdateRow;
