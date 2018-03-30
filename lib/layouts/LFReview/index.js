import React from 'react';
import { SectionList, InteractionManager } from 'react-native';
import Modalbox from 'react-native-modalbox';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { hotelLFSelector, groupedHotelLFSelector } from './selectors'
import UpdatesActions from '../../actions/updates';

import ListHeader from './ListHeader';
import Item from './Item';
import Modal from './Modal';

import {
  Container,
  Content,
  ContentSpacing
} from './styles';

class LFReviewLayout extends React.Component {

  state = {
    activeItem: null,
    selectedStatus: null,
  }

  _handleActiveItem = (item) => this.setState({ activeItem: item })

  _handleStatusUpdate = (status) => {
    const { activeItem: item, activeItem: { id } } = this.state;
    const update = { ...item, status };

    this.setState({ selectedStatus: status, activeItem: null });

    InteractionManager.runAfterInteractions(() => {
      this.props.updateItem(id, update);
    });
  }

  _handleCloseStatus = () => this.setState({ activeItem: null })

  render() {
    return (
      <Container>
        <Content>
          <SectionList
            renderItem={({ item }) => <Item item={item} handleActive={this._handleActiveItem} />}
            renderSectionHeader={({ section }) => <ListHeader date={section.title} key={section.title} />}
            sections={this.props.lostFoundItems}
            keyExtractor={(item, index) => item.reference || item.date_ts}
            ListHeaderComponent={() => <ContentSpacing />}
            ListFooterComponent={() => <ContentSpacing />}
            />
        </Content>

        <Modalbox
          isOpen={!!this.state.activeItem}
          onClose={this._handleCloseStatus}
          style={{ width: 800, height: 600 }}
          >
          <Modal
            status={get(this, 'state.activeItem.status', null)}
            handleUpdate={this._handleStatusUpdate}
            exit={this._handleCloseStatus}
            />
        </Modalbox>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    lostFoundItems: groupedHotelLFSelector(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateItem: (id, item) => dispatch(UpdatesActions.updateFoundStatus(id, item)),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LFReviewLayout);