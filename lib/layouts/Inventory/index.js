import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native';

// import { ListView, Button } from '@shoutem/ui';
import ListView from 'rc-mobile-base/lib/components/ListView';
import Button from 'rc-mobile-base/lib/components/Button';
import { filter } from 'lodash/collection';
import { get } from 'lodash/object';
import { defer, delay } from 'lodash/function';

import { connect } from 'react-redux';

import { getRoomById } from 'rc-mobile-base/lib/selectors/rooms';
import { getAssetsByRoomId, getRoomAreasByRoomId } from 'rc-mobile-base/lib/selectors/assets';
import UpdatesActions from 'rc-mobile-base/lib/actions/updates';
import DropDownMenu from 'rc-mobile-base/lib/components/DropDownMenu';

import InventoryUpdateRow from './InventoryUpdateRow';
import InventoryArea from './InventoryArea';
import SearchSubheader from 'rc-mobile-base/lib/components/SearchSubheader';

import {
  margin,
  flx1,
  white,
  red
} from 'rc-mobile-base/lib/styles';

class InventoryLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoomArea: null,
      searchQuery: null,
    }
  }

  static navigationOptions = {
    title: 'Room Inventory',
  };

  _updateSearch = (t) => this.setState({ searchQuery: t })

  _adjustInventory(asset) {
    const { room: roomId, _id: assetRoomId } = asset;
    this.props.adjustInventory(roomId, assetRoomId);
  }

  _resetInventory(asset) {
    const { room: roomId, _id: assetRoomId } = asset;
    this.props.resetInventory(roomId, assetRoomId);
  }

  _handleSelectArea = (area) => this.setState({ activeRoomArea: area })
  _handleCloseArea = () => this.setState({ activeRoomArea: null })

  render() {
    const { inventory, roomAreas } = this.props;
    const { activeRoomArea, searchQuery } = this.state;
    const filteredInventory = filter(inventory, asset => get(asset, 'asset.roomArea') === get(activeRoomArea, '_id'))
      .filter(asset => {
        if (!searchQuery) { return true; }
        const cleanQuery = searchQuery.toLowerCase();
        return get(asset, 'asset.name').toLowerCase().includes(cleanQuery);
      });

    return (
      <View style={styles.container}>
        { activeRoomArea ?
          <View style={[flx1]}>
            <SearchSubheader
              searchQuery={this.state.searchQuery}
              updateQuery={this._updateSearch}
              style={{
                container: { ...white.bg }
              }}
              >
              Search Items
            </SearchSubheader>
            <View style={[flx1]}>
              <ListView
                data={filteredInventory}
                renderRow={(rowData, secId, index) => <InventoryUpdateRow data={rowData} index={index} adjustInventory={this._adjustInventory.bind(this)} resetInventory={this._resetInventory.bind(this)} />}
                />
            </View>
            <Button style={[{ borderRadius: 0 }, red.bg]} onPress={this._handleCloseArea}>
              <Text style={[white.text]}>{ 'Close Area'.toUpperCase() }</Text>
            </Button>
          </View>
          :
          <ListView
            data={roomAreas}
            renderRow={(rowData, secId, rowIndex) => <InventoryArea area={rowData} onPress={this._handleSelectArea} />}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    backgroundColor: '#F7F7F7'
  },
});

const mapStateToProps = (state, props) => {
  const roomId = props.navigation.state.params.roomId
  return {
    room: getRoomById(roomId)(state),
    inventory: getAssetsByRoomId(roomId)(state),
    roomAreas: getRoomAreasByRoomId(roomId)(state),
    inventoryUpdates: state.updates.inventory
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustInventory: (roomId, assetRoomId) => dispatch(UpdatesActions.adjustInventory({ roomId, assetRoomId })),
    resetInventory: (roomId, assetRoomId) => dispatch(UpdatesActions.resetInventory({ roomId, assetRoomId })),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryLayout);
