/* eslint-disable no-alert */

import createRequest from './createRequest';

export default class ChatAPI {
  constructor(url) {
    this.url = url;
    this.websocket = null;
  }

  create(user, callback) {
    createRequest({
      url: `${this.url}/new-user`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: user,
      callback: (status, response) => {
        if (status) {
          callback(response);
        } else {
          alert('Ошибка! Этот псевдоним уже существует. Пожалуйста, выберите другой псевдоним.');
        }
      },
    });
  }

  exit(id, name) {
    const body = {
      type: 'exit',
      user: {
        id,
        name,
      },
    };
    this.websocket.send(JSON.stringify(body));
  }

  sendMessage(value, id, name) {
    const body = {
      type: 'send',
      user: {
        id,
        name,
      },
      msg: value,
    };
    this.websocket.send(JSON.stringify(body));
  }
}
