export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs('[data-id="menu"]');
    this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.gameField = this.#qs('[data-id="grid"]');
    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');

    this.$.gameFields = this.#qsAll('[data-id="square"]');

    // UI only event listeners

    this.$.menuBtn.addEventListener('click', this.toggleMenu.bind(this));
  }
  // REGISTER EVENTS METHODS

  bindResetEvent(handler) {
    this.$.resetBtn.addEventListener('click', handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener('click', handler);
  }

  bindPlayAgainEvent(handler) {
    this.$.modalBtn.addEventListener('click', handler);
  }

  bindGameField(handler) {
    this.$.gameField.addEventListener('click', handler);
  }

  // DOM HELPERS METHODS

  toggleMenu() {
    this.$.menuItems.classList.toggle('hidden');
    this.$.menu.classList.toggle('border');
    const icon = this.#qs('i', this.menu);
    icon.classList.toggle('rotate');
  }

  #qs(selector, parent) {
    const element = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!element) throw new Error("Could't find an element");
    return element;
  }

  #qsAll(selector) {
    const elsList = document.querySelector(selector);

    if (!elsList) throw new Error("Could't find elements");
    return elsList;
  }
}
