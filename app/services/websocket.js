import Service, { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { next } from '@ember/runloop';
import config from '../config/environment';

export default Service.extend({

  session: service(),
  websockets: service(),
  flashMessages: service(),

  socketRef: null,
  host: config.APP.webSocketHost,

  init() {
    this._super(...arguments);

    const host = get(this, 'host');
    const socket = get(this, 'websockets').socketFor(host);

    socket.on('open', this.open, this);
    socket.on('message', this.handleMessage, this);
    socket.on('close', this.reconnect, this);

    set(this, 'socketRef', socket);
  },

  open(){
    var authorization = get(this, 'session.session.content.authenticated');
    var token = {
      access_token: authorization.access_token,
      token_type: authorization.token_type,
    };
    var msg = JSON.stringify(token);
    this.sendEvent(msg);
  },

  reconnect() {
    next(this, () => {
      get(this, 'socketRef').reconnect();
    }, 10000);
  },

  handleMessage(event) {
    const flashMessages = get(this, 'flashMessages');
    flashMessages.add({ message: event.data });
  },

  sendEvent(msg) {
    const socket = get(this, 'socketRef');
    socket.send(msg);
  }

});
