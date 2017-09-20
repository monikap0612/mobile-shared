import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import ModalHeader from 'rc-mobile-base/lib/components/ModalHeader';
import IcoMoonIcon from 'rc-mobile-base/lib/components/IcoMoonIcon';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const ModalContent = ({ activeRoom, dismiss, submit }) => {
  const { name, turndownService } = activeRoom || {};
  const isDone = ['finish', 'dnd', 'refuse'].includes(turndownService);

  return (
    <View style={styles.container}>
      <ModalHeader
        value={name}
        onPress={this._handleDismissRoom}
        />

      { isDone ?
        <View>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => submit('')}>
            <Icon name="ban" color="white" size={48} style={[margin.b10]} />
            <Text style={styles.btnText}>{ 'Cancel Turndown'.toUpperCase() }</Text>
          </TouchableOpacity>
        </View>
        :
        <View>
          <TouchableOpacity style={styles.mainBtn} onPress={() => submit('finish')}>
            <IcoMoonIcon name="check" color="white" size={48} style={[margin.b10]} />
            <Text style={styles.btnText}>{ 'Finish Turndown'.toUpperCase() }</Text>
          </TouchableOpacity>
          <View style={styles.subBtns}>
            <TouchableOpacity style={[styles.subBtn, orange.bg, margin.r5]} onPress={() => submit('delay')}>
              <IcoMoonIcon name="delay" color="white" size={26} style={[margin.b5]} />
              <Text style={styles.btnText}>{ 'Delay'.toUpperCase() }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subBtn, slate.bg]} onPress={() => submit('dnd')}>
              <IcoMoonIcon name="dnd" color="white" size={30} style={[margin.b5]} />
              <Text style={styles.btnText}>{ 'DND'.toUpperCase() }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subBtn, red.bg, margin.l5]} onPress={() => submit('refuse')}>
              <IcoMoonIcon name="refuse" color="white" size={26} style={[margin.b5]} />
              <Text style={styles.btnText}>{ 'Refuse'.toUpperCase() }</Text>
            </TouchableOpacity>
          </View>
        </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  mainBtn: {
    height: 150,
    ...green.bg,
    ...margin.x10,
    ...margin.t15,
    borderRadius: 2,
    ...lCenterCenter
  },
  cancelBtn: {
    height: 260,
    ...red.bg,
    ...margin.x10,
    ...margin.t15,
    borderRadius: 2,
    ...lCenterCenter
  },
  subBtns: {
    height: 100,
    ...flxRow,
    ...margin.t5,
    ...margin.x10,
    ...margin.b15
  },
  subBtn: {
    height: 100,
    ...flx1,
    borderRadius: 2,
    ...lCenterCenter
  },
  btnText: {
    ...white.text,
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default ModalContent;
