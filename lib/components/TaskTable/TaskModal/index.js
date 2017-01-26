import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Lightbox } from '@shoutem/ui';
import Entypo from 'react-native-vector-icons/Entypo';
import { get } from 'lodash/object';

import UpdatesActions from 'rc-mobile-base/lib/actions/updates';
import { computedIndexedUsers } from 'rc-mobile-base/lib/selectors/users';
import { close as closeModal } from 'rc-mobile-base/lib/modal';

import {
  eitherGrey_100_200,
  flxRow,
  flx1,
  blue,
  red,
  orange,
  lCenterCenter,
  aic,
  jcsb,
  padding,
  margin,
  text,
  greyDk,
  slate,
  white
} from 'rc-mobile-base/lib/styles';

import ModalHeader from '../../ModalHeader';

import Stats from './Stats';
import LastHistory from './LastHistory';
import NewMessage from './NewMessage';

const Label = ({ label, style }) => (
  <Text style={[styles.labelStyle, style]}>{ label.toUpperCase() }</Text>
)

const UpdateCommand = ({ children, onPress, style }) => (
  <TouchableOpacity style={[styles.commandBtn, style]} onPress={onPress}>
    <Text style={styles.commandLabel}>{ children.toUpperCase() }</Text>
  </TouchableOpacity>
)

class TaskModal extends Component {

  _handleUpdate = (status) => {
    const { task: { uuid }, closeModal, updateTask } = this.props;
    updateTask(uuid, status);
    closeModal();
  }

  render() {
    const { task, closeModal, indexUsers } = this.props;
    const { uuid } = task;
    const image = get(task, 'meta.image', null);
    const assigned = get(task, 'responsible') && `${task.responsible.first_name} ${task.responsible.last_name}` || get(task, 'assigned.label');
    const isClosed = get(task, 'is_completed') || get(task, 'is_cancelled');

    return (
      <View style={styles.container}>
        <View style={[styles.header, flxRow, blue.bg]}>
          <View style={styles.headerSide}></View>
          <Text style={[white.text, { fontSize: 17 }]}>{ task.task }</Text>
          <TouchableOpacity style={styles.headerSide} onPress={closeModal}>
            <Entypo name="cross" size={32} color={white.color} />
          </TouchableOpacity>
        </View>

        <View style={[flxRow, padding.a20, jcsb]}>
          <View style={[{ width: 196, height: 510 }]}>
            { image ?
              <Lightbox
                key={image}
                renderContent={() => <Image style={{ height: 300, marginTop: Dimensions.get('window').height / 2 - 150 }} resizeMode="contain" source={{ uri: image }} />}
                swipeToDismiss={false}
                >
                <Image
                  source={{ uri: image }}
                  resizeMode="stretch"
                  style={styles.imageStyle}
                  />
              </Lightbox>
              : null
            }

            <Stats task={task} />
          </View>

          <View style={[{ width: 424, height: 510 }]}>
            <Label label={'Assigned To'} />
            <Text style={styles.valueStyle}>{ assigned }</Text>

            <Label label={'Last Action'} style={{ ...margin.t15 }} />
            <LastHistory task={task} indexUsers={indexUsers} />

            <Label label={'Messages'} style={{ ...margin.t15, ...margin.b5 }} />
            <NewMessage />
          </View>

          <View style={[{ width: 100, height: 510 }]}>
            { !isClosed ?
              <UpdateCommand
                onPress={() => this._handleUpdate('completed')}
                style={{ ...blue.bg }}
                >
                Complete Task
              </UpdateCommand>
              : null
            }
            { !isClosed ?
              <UpdateCommand
                onPress={() => this._handleUpdate('cancelled')}
                style={{ ...red.bg }}
                >
                Cancel Task
              </UpdateCommand>
              : null
            }
            { !isClosed ?
              <UpdateCommand
                onPress={null}
                style={{ ...orange.bg }}
                >
                Reassign Task
              </UpdateCommand>
              : null
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: 800,
    backgroundColor: 'white'
  },
  header: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerSide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50
  },
  imageStyle: {
    height: 196,
    width: 196,
    marginBottom: 10
  },
  labelStyle: {
    ...slate.text,
    opacity: .7,
    fontSize: 14,
    marginBottom: 2
  },
  valueStyle: {
    fontSize: 17,
    ...slate.text,
    fontWeight: '500',
    opacity: .9
  },
  subvalueStyle: {
    fontSize: 14,
    ...slate.text,
    opacity: .8,
  },
  commandBtn: {
    width: 100,
    height: 60,
    borderRadius: 2,
    ...padding.x10,
    ...margin.b10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  commandLabel: {
    fontSize: 14,
    ...white.text,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => {
  return {
    indexUsers: computedIndexedUsers(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (uuid, status) => dispatch(UpdatesActions.taskUpdate({ uuid, status })),
    closeModal: () => dispatch(closeModal()),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);
