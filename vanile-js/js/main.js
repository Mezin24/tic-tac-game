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

  // function initView() {
  //   view.closeAll();
  //   view.showTernInfo(store.game.currentPlayer);
  //   view.clearFields();
  //   view.showStats(
  //     store.stats.playerWins[0].wins,
  //     store.stats.playerWins[1].wins,
  //     store.stats.ties
  //   );
  //   view.viewFields(store.game.moves);
  // }
  view.render(store.game, store.stats);
  window.addEventListener('storage', () => {
    view.render(store.game, store.stats);
  });

  // initView();

  view.bindNewRoundEvent(() => {
    store.newRound();
    view.render(store.game, store.stats);
  });

  view.bindResetEvent(() => {
    store.reset();
    view.render(store.game, store.stats);
  });

  view.bindGameField(function (event) {
    const { target: square } = event;

    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );
    if (existingMove || square.dataset.id !== 'square') return;

    view.handlePlayerMove(square, store.game.currentPlayer);
    store.playMove(+square.id);
    view.render(store.game, store.stats);
  });
}
window.addEventListener('load', init);
