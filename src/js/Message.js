export default class Message {
  constructor(text, senderData, currentUserID) {
    this.text = text;
    this.senderData = senderData;
    this.currentUserID = currentUserID;
    this.formElement = document.createElement('li');
    this.formElement.classList = 'message';
  }

  create() {
    const date = Message.getDate();
    const sameUser = this.checkUser();
    let username = this.senderData.name;
    let additionalInf = '';
    let additionalText = '';
    if (sameUser) {
      this.formElement.classList.add('user_message');
      username = 'You';
      additionalInf = 'user_info';
      additionalText = 'user_text';
    }
    const msg = `
      <div class="blob">
         <text class="msg_info ${additionalInf}">${username}, ${date}</text>
         <text class="text ${additionalText}">${this.text}</text>
      </div>
      `;
    return msg;
  }

  static getDate() {
    const rawDate = new Date();
    const yy = rawDate.getFullYear().toString().slice(-2);
    const mm = Message.insertZeroes(rawDate.getMonth() + 1);
    const dd = Message.insertZeroes(rawDate.getDate());
    const hh = Message.insertZeroes(rawDate.getHours());
    const min = Message.insertZeroes(rawDate.getMinutes());

    const date = `${dd}.${mm}.${yy} ${hh}:${min}`;
    return date;
  }

  static insertZeroes(value) {
    let newValue;
    if (value < 10) {
      newValue = `0${value}`;
      return newValue;
    }
    return value;
  }

  checkUser() {
    if (this.senderData.id !== this.currentUserID) {
      return false;
    }
    return true;
  }
}
