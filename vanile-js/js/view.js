export default class View {
  $ = {};

  constructor() {
    this.$.menu = document.querySelector('[data-id="menu"]');
    this.$.menuBtn = document.querySelector('[data-id="menu-btn"]');
    this.$.menuItems = document.querySelector('[data-id="menu-items"]');
    this.$.resetBtn = document.querySelector('[data-id="reset-btn"]');
    this.$.newRoundBtn = document.querySelector('[data-id="new-round-btn"]');
    this.$.gameField = document.querySelector('[data-id="grid"]');
    this.$.gameFields = document.querySelectorAll('[data-id="square"]');
    this.$.modal = document.querySelector('[data-id="modal"]');
    this.$.modalText = document.querySelector('[data-id="modal-text"]');
    this.$.modalBtn = document.querySelector('[data-id="modal-btn"]');
    this.$.turn = document.querySelector('[data-id="turn"]');

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
    const icon = this.$.menu.querySelector('i');
    icon.classList.toggle('rotate');
  }
}
