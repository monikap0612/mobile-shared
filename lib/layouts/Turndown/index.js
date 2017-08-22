import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  InteractionManager
} from 'react-native';

import ListView from 'rc-mobile-base/lib/components/ListView';
import Modal from 'react-native-modalbox';

import { connect } from 'react-redux';

import UpdatesActions from 'rc-mobile-base/lib/actions/updates';

import { get } from 'lodash/object';
import { find } from 'lodash/collection';

// import { computedGuestRoomsByFloor } from 'rc-mobile-base/lib/selectors/runner';
import { computedUserNightRoomsByFloor } from './selectors';

import Subheader from './Subheader';
import RoomRow from './RoomRow';
import FloorLabel from './FloorLabel';
import ModalContent from './ModalContent';

import {
  flx1,
  lCenterCenter,
  margin,
  green,
  white,
  slate,
  red,
  orange,
  flxRow
} from 'rc-mobile-base/lib/styles';

class TurndownLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoomId: null,
      isFilterOpen: false,
      isFilterActive: false,
      activeRoomCategory: { label: 'All Categories', _id: 'all'},
      activeCategories: [],
    }
  }

  componentWillMount() {
    const { roomCategories } = this.props;

    const activeCategories = roomCategories.map(category => ({ label: category.label, value: category._id, isEnabled: true }));
    this.setState({ activeCategories });
  }

  _handleActiveRoom = (roomId) => this.setState({ activeRoomId: roomId })
  _handleDismissRoom = () => this.setState({ activeRoomId: null })

  _handleToggleFilter = () => this.setState({ isFilterOpen: !this.state.isFilterOpen })
  _handleUpdateRoomCategory = (category) => this.setState({ activeRoomCategory: category })
  _handleToggleCategory = (value) => {
    const { activeCategories } = this.state;

    const updatedCategories = activeCategories.map(category => {
      let updated = category.asMutable ? category.asMutable() : category;
      if (value === updated.value) {
        updated.isEnabled = !updated.isEnabled;
      }
      return updated;
    });

    this.setState({ activeCategories: updatedCategories });
  }

  _handleTurndown = (value) => {
    const roomId = this.state.activeRoomId;

    if (!roomId) {
      return;
    }

    this._handleDismissRoom();
    InteractionManager.runAfterInteractions(() => {
      this.props.turndown(roomId, value);
    })
  }

  _getRoom = () => find(this.props.rooms, { _id: this.state.activeRoomId })

  render() {
    const { rooms } = this.props;
    const { activeRoomCategory } = this.state;
    const activeRoom = this._getRoom();
    const availableCategory = this.state.activeCategories
      .filter(category => category.isEnabled)
      .map(category => category.value)

    let filterRooms = rooms.filter(room => availableCategory.includes(room.roomCategory._id))

    return (
      <View style={styles.container}>
        <Subheader
          rooms={filterRooms}
          isFilterOpen={this.state.isFilterOpen}
          toggleFilter={this._handleToggleFilter}
          isFilterActive={this.state.activeCategories.length !== availableCategory.length}
          roomCategories={this.props.roomCategories}
          activeCategories={this.state.activeCategories}
          activeRoomCategory={this.state.activeRoomCategory}
          updateCategory={this._handleToggleCategory}
          />
        <View style={[flx1]}>
          <ListView
            data={filterRooms}
            renderRow={(data) => <RoomRow room={data} activateRoom={this._handleActiveRoom} />}
            renderHeader={() => <View style={[margin.t15]}></View>}
            renderSectionHeader={(number) => <FloorLabel>{ number }</FloorLabel>}
            getSectionId={(row) => (get(row, 'floor.number'))}
            />
        </View>

        <Modal
          style={[styles.modal, styles.modal4]}
          position={"bottom"}
          isOpen={!!this.state.activeRoomId}
          onClosed={this._handleDismissRoom}
          >
          <ModalContent
            activeRoom={activeRoom}
            dismiss={this._handleDismissRoom}
            submit={this._handleTurndown}
            />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    backgroundColor: '#F7F7F7'
  },
  modal: {
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  modal4: {
    height: 340
  },
});

const mapStateToProps = (state) => {
  return {
    rooms: computedUserNightRoomsByFloor(state),
    roomCategories: state.rooms.hotelRoomCategories,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    turndown: (roomId, value) => dispatch(UpdatesActions.roomTurndown({ roomId, value })),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TurndownLayout);
