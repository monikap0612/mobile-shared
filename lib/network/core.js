import { NetInfo } from 'react-native';
import Actions from './actions';
import { Actions as OfflineActions } from '../offline';

class Network {
  constructor(dispatch, options) {
    this.dispatch = dispatch;
    this.handleStatus = this._handleStatus.bind(this);
  }

  _handleStatus(status) {
    console.log('NETWORK STATUS', status)
    const normalized = status.toLowerCase();
    // Strictest
    if (normalized === 'wifi' || normalized === 'wimax') {
      this.dispatch(Actions.statusOnline());
      this.dispatch(OfflineActions.start());
    } else {
      this.dispatch(Actions.statusOffline());
    }
    // Less strict
    // if (normalized === 'none' || normalized === 'unknown') {
    //   this.dispatch(Actions.statusOnline());
    //   this.dispatch(Actions.statusOffline());
    // } else {
    //   this.dispatch(Actions.statusOnline());
    // }
  }

  activate() {
    NetInfo.fetch().done(this.handleStatus);
    NetInfo.addEventListener('change', this.handleStatus);
  }

  deactivate() {
    NetInfo.removeEventListener('change', this.handleStatus);
  }
}

export default Network;
