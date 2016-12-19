import { NetInfo } from 'react-native';
import Actions from './actions';
import { Actions as OfflineActions } from '../offline';
import request from '../utils/request';
import { INTERVAL_TIME, OFFLINE_INTERVAL_TIME, PING_URL } from './config';

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
  }

  status = ''

  _checkStatus = () => {
    const { status } = this;
    return request(PING_URL)
    .then(response => {
      if (status !== 'online') {
        this.status = 'online';
        this.dispatch(Actions.statusOnline());
        this.dispatch(OfflineActions.start());
        this._runOnline();
      }
    })
    .catch(e => {
      if (status !== 'offline') {
        this.status = 'offline';
        this.dispatch(Actions.statusOffline());
        this._runOffline();
      }
    });
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
<<<<<<< HEAD
    console.log('network activated');
    this._checkStatus();
    NetInfo.addEventListener('change', this._checkStatus.bind(this));
  }

  _runOffline() {
    console.log('offline protocol');
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      console.log('offline check...')
      this._checkStatus();
    }, OFFLINE_INTERVAL_TIME);
  }

  _runOnline() {
    console.log('online protocol');
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      console.log('online check...')
=======
    // NetInfo.fetch().done(this.handleStatus);
    // NetInfo.addEventListener('change', this.handleStatus);
    console.log('network activated');
    this._checkStatus();

    this.timer = setInterval(() => {
>>>>>>> updated for inspector
      this._checkStatus();
    }, INTERVAL_TIME);
  }

  deactivate() {
<<<<<<< HEAD
    console.log('network deactivated');
    clearInterval(this.timer);
    NetInfo.removeEventListener('change', this._checkStatus.bind(this));
=======
    // NetInfo.removeEventListener('change', this.handleStatus);
    clearInterval(this.timer);
>>>>>>> updated for inspector
  }
}

export default Network;
