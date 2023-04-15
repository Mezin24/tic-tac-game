import './styles/index.css';

const App = {
  $: {
    menu: document.querySelector('[data-id="menu"'),
    menuItems: document.querySelector('[data-id="menu-items"'),
    resetBtn: document.querySelector('[data-id="reset-btn"'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"'),
    gameField: document.querySelector('[data-id="grid"'),
  },
  registerEventListeners() {
    this.$.menu.addEventListener('click', () => {
      this.$.menuItems.classList.toggle('hidden');
    });

    this.$.resetBtn.addEventListener('click', () => {
      console.log('reset the game');
    });
    this.$.newRoundBtn.addEventListener('click', () => {
      console.log('new round');
    });

    this.$.gameField.addEventListener('click', (e) => {
      const dataId = e.target.getAttribute('data-id');
      if (dataId !== 'square') return;

      const id = e.target.id;
      const icon = document.createElement('i');
      icon.classList.add('fa-solid', 'fa-x', 'yellow');
      e.target.append(icon);
    });
  },
  init() {
    this.registerEventListeners();
  },
};

window.addEventListener('load', App.init.bind(App));

// <i class="fa-solid fa-x turquoise"></i>
// <i class="fa-solid fa-0 yellow"></i>
