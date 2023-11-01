export default class Form {
  constructor() {
    this.formElement = document.createElement('div');
    this.formElement.className = 'form';
  }

  static create() {
    const form = `
      <h1 class="form_name">Выберите псевдоним</h1>
      <form class="form_group">
         <textarea class="name_input"></textarea>
         <button type=submit class="button confirm">Продолжить</button>
      </form>`;
    return form;
  }
}
