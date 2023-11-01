export default class ChatWindow {
  constructor() {
    this.formElement = document.createElement('div');
    this.formElement.className = 'windows';
  }

  static create() {
    const window = `
      <div class="participants window">
        <ul class="part_list">
          
        </ul>
        <button class='button exit'>Выход</button>
      </div>
      <div class="chat window">
        <ul class="messages"></ul>
        <input class="input window" placeholder="Type your message here"></input>
      </div>`;
    return window;
  }

  static userCell(user, currentID) {
    let username = user.name;
    let additionalTag = '';
    if (user.id === currentID) {
      username = 'You';
      additionalTag = 'user_info';
    }
    const cell = document.createElement('li');
    cell.className = 'user';
    cell.innerHTML = `
    <span class="avatar"></span>
    <text class="username ${additionalTag}">${username}</text>
    `;
    return cell;
  }
}
