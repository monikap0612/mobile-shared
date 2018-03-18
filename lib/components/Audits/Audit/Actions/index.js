import React from 'react';
import { View, Modal, Text } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';

import {
  Actions,
  ActionWrapper,
  ActionText,
  ModalBackdrop,
  ModalWrapper,
  ModalHeader,
  ModalContent,
  ModalInput,
  ModalActions,
  ModalButton,
  ModalLink,
  ModalSubmit,
  ModalCancel,
  ModalPhoto,
  ModalCamera,
  ModalCapture,
  ModalPreview,
  Thumb,
} from './styles';

class Note extends React.Component {
  state = {
    isOpen: false,
    value: this.props.value
  }

  handleOpen = () => !this.props.readOnly && this.setState({ isOpen: !this.state.isOpen, value: null })
  handleChange = (value) => this.setState({ value })

  render() {
    const {
      onChange,
      active,
      noteText,
      addNoteText,
      saveText,
      cancelText,
      ...props
    } = this.props
     return (
       <View>
         <ActionWrapper
           {...props}
           onPress={this.handleOpen}
           style={{marginRight: 5}}
         >
           <FontAwesome
             name="file-text-o"
             size={24}
             color={active ? '#222222' : '#B4B4B4'}
           />
           <ActionText active={active}>
             {noteText}
           </ActionText>
         </ActionWrapper>
         <Modal
           transparent
           animationType={"fade"}
           visible={this.state.isOpen}
           onRequestClose={() => this.setState({ isOpen: false })}
         >
           <ModalBackdrop>
             <ModalWrapper>
               <ModalHeader>
                 {addNoteText}
               </ModalHeader>
               <ModalContent>
                 <ModalInput
                   multiline={true}
                   numberOfLines={4}
                   placeholder="Start typing to add a note..."
                   onChangeText={this.handleChange}
                   value={this.state.value}
                 />
                 <ModalActions>
                   <ModalButton onPress={() => {
                     onChange(this.state.value)
                     this.handleOpen()
                   }}>
                     <ModalSubmit>
                       {saveText}
                     </ModalSubmit>
                   </ModalButton>
                   <ModalLink onPress={this.handleOpen}>
                     <ModalCancel>
                       {cancelText}
                     </ModalCancel>
                   </ModalLink>
                 </ModalActions>
               </ModalContent>
             </ModalWrapper>
           </ModalBackdrop>
         </Modal>
       </View>
     )
  }
}

Note.defaultProps = {
  noteText: 'Note',
  addNoteText: 'Add a note',
  saveText: 'Save',
  cancelText: 'Cancel',
}

class Photo extends React.Component {
  state = {
    isOpen: false,
    value: this.props.value
  }

  handleOpen = () => !this.props.readOnly && this.setState({ isOpen: !this.state.isOpen, value: null })
  handleChange = (value) => this.setState({ value })
  takePhoto = () => {
    this.camera.capture()
      .then(({ path, ...other }) => {
        this.handleChange(path)
      })
      .catch(err => console.error(err));
  }

  render() {
    const {
      onChange,
      active,
      photo,
      photoText,
      addPhotoText,
      saveText,
      cancelText,
      ...props
    } = this.props
    return (
       <View>
         <ActionWrapper
           {...props}
           onPress={this.handleOpen}
         >
           {
             photo ? (
               <Thumb source={{uri: photo}} />
             ) : (
               <FontAwesome
                 name="camera"
                 size={24}
                 color={active ? '#222222' : '#B4B4B4'}
               />
             )
           }
           <ActionText active={active}>
             {photoText}
           </ActionText>
         </ActionWrapper>
         <Modal
           transparent
           animationType={"fade"}
           visible={this.state.isOpen}
           onRequestClose={() => this.setState({ isOpen: false })}
         >
           <ModalBackdrop>
             <ModalPhoto>
               <ModalHeader>
                 {addPhotoText}
               </ModalHeader>
               <ModalContent>
                 {
                   this.state.value ? (
                     <ModalPreview
                       source={{uri: this.state.value}}
                     />
                   ) : (
                     <ModalCamera
                       innerRef={(cam) => this.camera = cam}
                       aspect={Camera.constants.Aspect.fill}
                       captureTarget={Camera.constants.CaptureTarget.temp}
                     >
                       <ModalCapture onPress={this.takePhoto}>
                         <FontAwesome name="camera" size={36} />
                       </ModalCapture>
                     </ModalCamera>
                   )
                 }
                 <ModalActions>
                   <ModalButton onPress={() => {
                     onChange(this.state.value)
                     this.handleOpen()
                   }}>
                     <ModalSubmit>
                       {saveText}
                     </ModalSubmit>
                   </ModalButton>
                   <ModalLink onPress={this.handleOpen}>
                     <ModalCancel>
                       {cancelText}
                     </ModalCancel>
                   </ModalLink>
                 </ModalActions>
               </ModalContent>
             </ModalPhoto>
           </ModalBackdrop>
         </Modal>
       </View>
     )
  }
}

Photo.defaultProps = {
  photoText: 'Photo',
  addPhotoText: 'Add a photo',
  saveText: 'Save',
  cancelText: 'Cancel',
}

Actions.Note = Note
Actions.Photo = Photo

export default Actions
