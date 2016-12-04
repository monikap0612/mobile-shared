import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Spinner, List, ListItem, Text, H2, H3, View } from 'native-base';
import { createStructuredSelector } from 'reselect';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';

import UpdateActions from '../lib/actions/updates';
import OverlayActions from '../lib/actions/overlay';

import { isVisibleOverlaySelector } from '../lib/selectors/overlay';
import { offlineQueueSelector, offlineMetaSelector } from '../lib/offline/selectors';
import OfflineActions from '../lib/offline/actions';

import { StyleSheet } from 'react-native';

NativeTachyons.build({
   rem: 16
}, StyleSheet);

const renderItem = (dequeue) => (item) => (
  <ListItem>
    <View>
      <Text style={[s.f4]}>
          {item.saga}
      </Text>
      <Text style={[s.f6]}>
          {item.ts}
      </Text>
    </View>
    <Button danger onPress={dequeue(item)}>
        <Icon name='ios-close-circle' />
    </Button>
  </ListItem>
)

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    const { isVisibleOverlay, queue, meta } = this.props;
    return (
      <Provider store={this.props.store}>
          <Container> 
              <Header>
                  <Title>Sandbox</Title>
              </Header>
              <Content>
                  <View style={[s.flx_row, s.jcc, s.pv1]}>
                    <Button style={[s.mh1]} primary onPress={this.props.roomNotePost({ roomId: 1, note: 'note' })}>
                      Room Note Post
                    </Button>
                    <Button style={[s.mh1]} danger iconLeft onPress={this.props.clearQueue}>
                      <Icon name='ios-close-circle' />
                      <Text>
                        Clear
                      </Text>
                    </Button>
                    <Button style={[s.mh1]} success onPress={this.props.startQueue}>
                        <Icon name='ios-play' />
                    </Button>
                    <Button style={[s.mh1]} warning onPress={this.props.stopQueue}>
                        <Icon name='ios-pause' />
                    </Button>
                  </View>

                  <View style={[s.jcc, s.ml3, s.mh2]}>
                    <Text>Delay: {meta.delay}</Text>
                    <Text>Total Attempts: {meta.attempts}</Text>
                    <Text>Current Running: {meta.currentRunning && meta.currentRunning.saga}</Text>
                    <Text>Current Attempt: {meta.currentAttempt}</Text>
                  </View>

                  {
                    queue && queue.length > 0 ? (
                      <List
                        dataArray={queue}
                        renderRow={renderItem(this.props.dequeue)}
                      />
                    ) : (
                      <Text style={[s.jcc, s.ml3, s.mh2]}>Queue is Empty</Text>
                    )
                  }
              </Content>
          </Container>
      </Provider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isVisibleOverlay: isVisibleOverlaySelector,
  queue: offlineQueueSelector,
  meta: offlineMetaSelector,
});

const mapDispatchToProps = (dispatch) => ({
  roomNotePost: (room) => () => dispatch(UpdateActions.roomNoteAdd(room)),
  dequeue: (item) => () => dispatch(OfflineActions.dequeue(item)),
  clearQueue: () => dispatch(OfflineActions.clear()),
  stopQueue: () => dispatch(OfflineActions.stop()),
  startQueue: () => dispatch(OfflineActions.start()),
  spin: () => {
    setTimeout(() => {
      dispatch(OverlayActions.overlayHide());
    }, 700)
    dispatch(OverlayActions.overlayShow({ message: 'Updating' }));
  },
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
