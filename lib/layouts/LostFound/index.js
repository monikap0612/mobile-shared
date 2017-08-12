import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  ListView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import Camera from 'react-native-camera';
import I18n from 'react-native-i18n';
import Button from 'rc-mobile-base/lib/components/Button';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import CircleButton from 'rc-mobile-base/lib/components/CircleButton';

import moment from 'moment';

import { connect } from 'react-redux';

import { getRoomById } from 'rc-mobile-base/lib/selectors/rooms';

import UpdatesActions from 'rc-mobile-base/lib/actions/updates';
import LostFoundActions from 'rc-mobile-base/lib/actions/lost-found';
import * as Colors from 'rc-mobile-base/lib/styles/colors';

class LostFound extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    const { room: { name }} = this.props;
    this.props.navigation.setParams({ title: `Lost Item (${name})` });
  }

  render() {
    const {
      photo,
      description,
      submitting,
      submissionError,
    } = this.props;

    const disableSubmit = this.disableSubmit();

    return (
      <View style={styles.outerContainer}>
        {
          photo.path ?
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={this._handleXButtonPress} style={styles.xButtonContainer}>
                <EntypoIcon name='cross' size={30} style={styles.xButton} />
              </TouchableOpacity>
              <Image source={{uri: photo.path}} style={{flex: 1}}/>
            </View>
            :
            <View style={{ flex: 1}}>
              <Camera
                ref={ cam => {
                  this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}>
              </Camera>
              <View style={styles.cameraButtonContainer}>
                <CircleButton radius={36} type={'highlight'} style={styles.cameraButton} onPress={this._handleTakePicture}>
                  <FaIcon name="camera" size={30} color={Colors.white.color}/>
                </CircleButton>
              </View>
            </View>
        }

        <View style={styles.innerContainer}>
          <TextInput
            style={styles.textDesc}
            value={description}
            onChangeText={(text) => this.props.setDescription(text)}
            multiline={false}
            maxLength={200}
            placeholder={I18n.t('attendant.lostfound.index.description')}
            underlineColorAndroid={Colors.transparent.color} />
          <TouchableOpacity disabled={disableSubmit} onPress={this._handleAddLostItem.bind(this)} style={[styles.submitButton, disableSubmit ? styles.submitButtonDisabled : {}]}>
            <Text style={styles.submitButtonText}>{ I18n.t('attendant.lostfound.index.submit-lost-item') }</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _handleTakePicture = () => {
    const options = {
      target: Camera.constants.CaptureTarget.temp
    };

    this.camera.capture(options)
      .then((data) => {
        const photoId = moment().format('X');
        const photoPath = data.path;

        this.props.uploadPhoto(photoPath, photoId);
        this.props.setPhoto(photoPath, photoId);


      })
      .catch(err => console.error(err));
  }

  _handleXButtonPress = () => {
    const {
      photoId,
      clearPhoto,
      photoRemove,
    } = this.props;

    clearPhoto();
    photoRemove(photoId);
  }

  _handleAddLostItem() {
    const {
      room: { _id: roomId },
      photoId,
      description,
    } = this.props;

    this.props.addLostItem(description, roomId, photoId);
    this.props.navigation.goBack();
  }

  disableSubmit = () => {
    const {
      photo,
      description,
      submitting,
      submissionError,
      uploadingPhoto
    } = this.props;

    if(submitting) return true;
    if(photo.loading) return true;
    if(!description) return true;

    return false;
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: 0,
  },
  innerContainer: {
    padding: 10,
    height: 125,
    justifyContent: 'space-around',
  },
  imageContainer: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cameraButtonContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    borderColor: Colors.white.color,
    backgroundColor: Colors.transparent.color,
    borderWidth: 4,
  },
  xButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 5,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red.color,
    borderRadius: 3,
  },
  xButton: {
    color: 'white',
  },
  textDesc: {
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
  },
  submitButton: {
    borderRadius: 3,
    height: 50,
    backgroundColor: '#61b62d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: Colors.greyDk.color,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17
  }
});

const mapStateToProps = (state, props) => {
  const photoId = state.lostFound.photoId;
  const photoPath = state.lostFound.photoPath;
  const photos = state.updates.photos;

  let photo = photoId && photos[photoId] ? photos[photoId] : { path: photoPath };
  photo = { ...photo, id: photoId };
  // console.log(photo)
  // console.log(state.lostFound);

  const roomId = props.navigation.state.params.roomId
  return {
    room: getRoomById(roomId)(state),
    photoPath,
    photo,
    ...state.lostFound,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPhoto: (path, id) => dispatch(LostFoundActions.setPhoto(path, id)),
    clearPhoto: () => dispatch(LostFoundActions.clearPhoto()),
    setDescription: (text) => dispatch(LostFoundActions.setDescription(text)),
    uploadPhoto: (path, id) => dispatch(UpdatesActions.photoUpload({ path, id})),
    photoRemove: (id) => dispatch(UpdatesActions.photoRemove(id)),
    addLostItem: (desc, roomId, photoId) => dispatch(UpdatesActions.lostItemAdd({ desc, roomId, photoId })),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LostFound);
