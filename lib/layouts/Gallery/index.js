import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet
} from 'react-native';

import ListView from 'rc-mobile-base/lib/components/ListView';
import Lightbox from 'react-native-lightbox';

import { connect } from 'react-redux';

import { getRoomById, getCatalogByRoomId } from 'rc-mobile-base/lib/selectors/rooms';

import {
  Container,
  ImageContainer,
  DescriptionContainer,
  DescriptionText
} from './styles';

import {
  lCenterCenter,
  white
} from 'rc-mobile-base/lib/styles';

const GalleryImage = ({ item }) => (
  <ImageContainer>
    <Lightbox
      swipeToDismiss={false}
      renderContent={() => (
        <ScrollView
          minimumZoomScale={1}
          maximumZoomScale={2}
          centerContent={true}
        >
        <Image style={{ height: 300, justifyContent: 'center', alignItems: 'center' }} source={{ uri: item.image }} />
        </ScrollView>
      )}
      >
      <ImageBackground
        style={styles.largeWideImage}
        source={{ uri: item && item.image || '' }}
      >
        <View style={styles.tile}>
          <Text style={styles.title}>{ item.comment }</Text>
        </View>
      </ImageBackground>
    </Lightbox>

    { item.description ?
      <DescriptionContainer>
        <DescriptionText>{ item.description }</DescriptionText>
      </DescriptionContainer>
      : null
    }
  </ImageContainer>
)

class GalleryLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    }
  }

  static navigationOptions = {
    title: 'Gallery',
  };

  componentWillMount() {
    const { room: { name }} = this.props;
  }

  _handlePress(item) {
    const { activeItem } = this.state;
    this.setState({ activeItem: activeItem === item ? null : item });
  }

  render() {
    const { activeItem } = this.state;
    const { catalog } = this.props;

    return (
      <Container>
        { catalog.map(item =>
          <GalleryImage
            key={item.image}
            item={item}
            />
        )}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 54,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 10,
    backgroundColor: '#F7F7F7',
  },
  largeWideImage: {
    height: 240
  },
  tile: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
    backgroundColor: 'rgba(0,0,0,.5)',
    ...lCenterCenter
  },
  title: {
    ...white.text,
    fontSize: 17
  }
});

const mapStateToProps = (state, props) => {
  const roomId = props.navigation.state.params.roomId
  // const isAttendant = props.navigation.getParam('isAttendant', false);
  // const isRunner = props.navigation.getParam('isRunner', false);
  // console.log(isAttendant, isRunner);

  return {
    room: getRoomById(roomId)(state),
    catalog: getCatalogByRoomId(roomId)(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryLayout);
