import React, { Component } from 'react';
import { View, Modal } from 'react-native';

export class ModalToggler extends Component {
  state = {
    isVisible: false
  }

  toggle = () => this.setState({ isVisible: !this.state.isVisible })

  render() {
    const { renderValue, renderModal, ...props } = this.props;

    return (
      <View>
        {renderValue(this.toggle)}
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.isVisible}
        >
          {renderModal(this.toggle)}
        </Modal>
      </View>
    )
  }
}

export default ModalToggler
