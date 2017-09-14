import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdatesActions from 'rc-mobile-base/lib/actions/updates';

import Turndown from '../../components/Turndown';

import { computedUserNightRoomsByFloor } from './selectors';

class TurndownLayout extends Component {
  render() {
    const { rooms, roomCategories, turndown } = this.props;

    return (
      <Turndown
        roomCategories={roomCategories}
        rooms={rooms}
        turndown={turndown}
      />
    )
  }
}

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
