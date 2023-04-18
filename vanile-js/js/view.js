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
    this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
    this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
    this.$.ties = this.#qs('[data-id="ties"]');

    this.$$.gameFields = this.#qsAll('[data-id="square"]');

    // UI only event listeners

    this.$.menuBtn.addEventListener('click', this.toggleMenu.bind(this));
  }
  // REGISTER EVENTS METHODS

  bindResetEvent(handler) {
    this.$.resetBtn.addEventListener('click', handler);
    this.$.modalBtn.addEventListener('click', handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener('click', handler);
  }

  bindGameField(handler) {
    this.$.gameField.addEventListener('click', handler);
  }

  // DOM HELPERS METHODS

  toggleMenu() {
    this.$.menuItems.classList.toggle('hidden');
    this.$.menu.classList.toggle('border');
    const icon = this.#qs('i', this.$.menu);
    icon.classList.toggle('rotate');
  }

  closeMenu() {
    this.$.menuItems.classList.add('hidden');
    this.$.menu.classList.remove('border');
    const icon = this.#qs('i', this.$.menu);
    icon.classList.remove('rotate');
  }

  openModal(message) {
    this.$.modal.classList.remove('hidden');
    this.$.modalText.textContent = message;
  }

  #closeModal() {
    this.$.modal.classList.add('hidden');
  }

  closeAll() {
    this.#closeModal();
    this.closeMenu();
  }

  showTernInfo({ name, iconClass, colorClass }) {
    this.$.turn.innerHTML = `
      <i class="fa-solid ${iconClass} ${colorClass}"></i>
      <p class=${colorClass}>${name}, you're up!</p>
    `;
  }

  clearFields() {
    this.$$.gameFields.forEach((field) => (field.innerHTML = ''));
  }

  viewFields(moves) {
    this.$$.gameFields.forEach((field) => {
      const existingMove = moves.find((move) => move.squareId === +field.id);

      if (existingMove) {
        this.handlePlayerMove(field, existingMove.player);
      }
    });
  }

  handlePlayerMove(square, { iconClass, colorClass }) {
    if (square.dataset.id !== 'square') return;

    square.innerHTML = `
      <i class="fa-solid ${iconClass} ${colorClass}"></i>
    `;
  }

  showStats(p1Wins, p2Wins, ties) {
    this.$.p1Wins.textContent = `${p1Wins} Wins`;
    this.$.p2Wins.textContent = `${p2Wins} Wins`;
    this.$.ties.textContent = ties;
  }

  #qs(selector, parent) {
    const element = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!element) throw new Error("Could't find an element");
    return element;
  }

  #qsAll(selector) {
    const elsList = document.querySelectorAll(selector);

    if (!elsList) throw new Error("Could't find elements");
    return elsList;
  }
}
