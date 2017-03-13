import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Swipeable from 'react-native-swipeable';

import ModalToggler from '../ModalToggler';
import SwipeoutOptions from './SwipeoutOptions';
import Row from './Row';

import {
  flex1,
  lCenterCenter,
  white
} from 'rc-mobile-base/lib/styles';

class SwipeRow extends Component {

  _handlePress = (activity) => {
    const { task, onSwipeoutPress } = this.props;

    if (this.swipeable && this.swipeable.recenter) {
      this.swipeable.recenter();
    }

    activity.children ? toggle() : onSwipeoutPress(task, activity);
  }

  render() {
    const { onSwipeoutPress, onScroll, task } = this.props;

    const createSwipeOption = (activity, toggle) => {
      return (
        <TouchableOpacity style={[{ backgroundColor: activity.backgroundColor, height: 70 }, flex1, { justifyContent: 'center'}]} onPress={() => this._handlePress(activity)}>
          <Text style={[white.text, { width: 75, textAlign: 'center'}]}>{ activity.text }</Text>
        </TouchableOpacity>
      )
    }

    return (
      <ModalToggler
        modalProps={{
          transparent: true
        }}
        renderValue={(toggle) => (
           <Swipeable
             onSwipeStart={() => onScroll(false)}
             onSwipeRelease={() => onScroll(true)}
             onRef={ref => this.swipeable = ref}
             style={[flex1]}
             rightButtons={task.activities.map(activity => createSwipeOption(activity, toggle))}
           >
             <Row {...this.props} task={task} />
           </Swipeable>
        )}
        renderModal={(toggle) => {
          const withChildren = task.activities.find(activity => activity.children)
          if (!withChildren) {
            return null
          }
          return (
            <SwipeoutOptions
              value={withChildren.children}
              task={task}
              onPress={onSwipeoutPress}
              close={toggle}
            />
          )
        }}
      />
    )
  }
}


export default SwipeRow;
