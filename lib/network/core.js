import { NetInfo } from 'react-native';
import Actions from './actions';
import { Actions as OfflineActions } from '../offline';

const INTERVAL_TIME = 20 * 1000;
const TIMEOUT_TIME = 8 * 1000;

function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("promise timeout"))
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  })
}

class Network {
  constructor(dispatch, options) {
    this.dispatch = dispatch;
    this.handleStatus = this._handleStatus.bind(this);
  }

  status = ''

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

  _checkStatus = () => {
    const { status } = this;
    const f = fetch('https://backend.roomchecking.com/api/connection', { method: 'GET' });
    timeoutPromise(TIMEOUT_TIME, f)
      .then(response => {
        if (status !== 'online') {
          this.status = 'online';
          this.dispatch(Actions.statusOnline());
          this.dispatch(OfflineActions.start());
        }
      })
      .catch(e => {
        if (status !== 'offline') {
          this.status = 'offline';
          this.dispatch(Actions.statusOffline());
        }
      });
  }

  activate() {
    // NetInfo.fetch().done(this.handleStatus);
    // NetInfo.addEventListener('change', this.handleStatus);
    console.log('network activated');
    this._checkStatus();

    this.timer = setInterval(() => {
      this._checkStatus();
    }, INTERVAL_TIME);
  }

  deactivate() {
    // NetInfo.removeEventListener('change', this.handleStatus);
    clearInterval(this.timer);
  }
}

export default Network;
