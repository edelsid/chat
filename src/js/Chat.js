/* eslint-disable no-alert */

import ChatAPI from './api/ChatAPI';
import ChatWindow from './ChatWindow';
import Message from './Message';
import Form from './Form';

export default class Chat {
  constructor(container) {
    this.bindToDOM(container);
    this.api = new ChatAPI('https://chat-1xfl.onrender.com');
    this.id = null;
    this.name = null;
  }

  init() {
    this.regForm();
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  regForm() {
    const regForm = new Form();
    regForm.formElement.innerHTML = regForm.constructor.create();
    document.body.appendChild(regForm.formElement);
    const confirmBtn = regForm.formElement.querySelector('.confirm');
    confirmBtn.addEventListener('click', (e) => this.submitUser(e, regForm));
  }

  submitUser(e, form) {
    e.preventDefault();

    const callback = (response) => {
      this.id = response.user.id;
      this.name = response.user.name;
      form.formElement.remove();
      this.api.websocket = new WebSocket('ws://chat-1xfl.onrender.com/ws');
      this.setChat();
      this.registerEvents();
    };

    if (form.formElement.querySelector('.name_input').value === '') {
      alert('Введите псевдоним');
      return;
    }
    const user = { name: form.formElement.querySelector('.name_input').value };
    this.api.create(user, callback);
  }

  setChat() {
    this.chatArea = new ChatWindow();
    this.chatArea.formElement.innerHTML = this.chatArea.constructor.create();
    const mainArea = document.querySelector('.windows');
    mainArea.appendChild(this.chatArea.formElement);
  }

  registerEvents() {
    const chat = document.querySelector('.messages');
    const message = document.querySelector('.input');
    const exit = document.querySelector('.exit');

    exit.addEventListener('click', () => {
      this.userExit();
    });

    message.addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') return;
      if (!message.value) return;
      this.api.sendMessage(message.value, this.id, this.name);
      message.value = '';
    });

    this.api.websocket.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'send') {
        this.renderMessage(chat, data);
        return;
      }

      this.renderUsers(data);
    });
  }

  renderUsers(data) {
    const userArea = document.querySelector('.part_list');
    if (userArea) {
      userArea.innerHTML = '';
      data.forEach((user) => {
        const cell = this.chatArea.constructor.userCell(user, this.id);
        userArea.appendChild(cell);
      });
    }
  }

  userExit() {
    const mainArea = document.querySelector('.windows');
    this.api.exit(this.id, this.name);
    mainArea.innerHTML = '';
    this.init();
  }

  renderMessage(chat, data) {
    const newMessage = new Message(data.msg, data.user, this.id);
    newMessage.formElement.innerHTML = newMessage.create();
    chat.appendChild(newMessage.formElement);
  }
}
