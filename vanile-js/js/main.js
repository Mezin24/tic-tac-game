import '../styles/index.css';
import Store from './store';
import View from './view';

const players = [
  {
    id: 1,
    name: 'Player 1',
    iconClass: 'fa-x',
    colorClass: 'turquoise',
  },
  {
    id: 2,
    name: 'Player 2',
    iconClass: 'fa-o',
    colorClass: 'yellow',
  },
];

function init() {
  const view = new View();
  const store = new Store('t3-storage', players);

  view.render(store.game, store.stats);
  window.addEventListener('storage', () => {
    view.render(store.game, store.stats);
  });

  store.addEventListener('statechange', () => {
    view.render(store.game, store.stats);
  });

  view.bindNewRoundEvent(() => {
    store.newRound();
  });

  view.bindResetEvent(() => {
    store.reset();
  });

  view.bindGameField(function (event) {
    const { target: square } = event;

    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );
    if (existingMove || square.dataset.id !== 'square') return;

    view.handlePlayerMove(square, store.game.currentPlayer);
    store.playMove(+square.id);
  });
}
window.addEventListener('load', init);
