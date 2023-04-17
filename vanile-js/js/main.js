import '../styles/index.css';
import View from './view';

// const App = {
//   $: {
//     menu: document.querySelector('[data-id="menu"]'),
//     menuItems: document.querySelector('[data-id="menu-items"]'),
//     resetBtn: document.querySelector('[data-id="reset-btn"]'),
//     newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
//     gameField: document.querySelector('[data-id="grid"]'),
//     gameFields: document.querySelectorAll('[data-id="square"]'),
//     modal: document.querySelector('[data-id="modal"]'),
//     modalText: document.querySelector('[data-id="modal-text"]'),
//     modalBtn: document.querySelector('[data-id="modal-btn"]'),
//     turn: document.querySelector('[data-id="turn"]'),
//   },
//   state: {
//     moves: [],
//   },
//   getGameStatus(moves) {
//     function getMoves(player) {
//       return moves
//         .filter((move) => move.player === player)
//         .map((move) => move.gameField);
//     }
//     const p1Moves = getMoves(1);
//     const p2Moves = getMoves(2);
//     const movesSum = moves.length;

//     const winningPatterns = [
//       [1, 2, 3],
//       [1, 5, 9],
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 5, 7],
//       [3, 6, 9],
//       [4, 5, 6],
//       [7, 8, 9],
//     ];

//     let winner = null;
//     winningPatterns.forEach((pattern) => {
//       const p1Win = pattern.every((num) => p1Moves.includes(num));
//       const p2Win = pattern.every((num) => p2Moves.includes(num));

//       if (p1Win) winner = 1;
//       if (p2Win) winner = 2;
//     });

//     return {
//       status: movesSum === 9 || Boolean(winner) ? 'complete' : 'pending',
//       winner,
//     };
//   },
//   registerEventListeners() {
//     // OPEN MENU
//     this.$.menu.addEventListener('click', () => {
//       this.$.menuItems.classList.toggle('hidden');
//     });
//     // RESET
//     this.$.resetBtn.addEventListener('click', () => {
//       console.log('reset the game');
//     });
//     // NEW ROUND
//     this.$.newRoundBtn.addEventListener('click', () => {
//       console.log('new round');
//     });
//     // PLAY AGAIN
//     this.$.modalBtn.addEventListener('click', () => {
//       this.$.modal.classList.add('hidden');
//       this.$.gameFields.forEach((square) => (square.innerHTML = ''));
//     });
//     // GAME FIELD
//     this.$.gameField.addEventListener('click', (e) => {
//       const dataId = e.target.getAttribute('data-id');
//       if (dataId !== 'square') return;
//       const id = +e.target.id;

//       const hasMove = (squareId) =>
//         this.state.moves.find((move) => move.gameField === squareId);

//       if (hasMove(id)) return;

//       const currentPlayer =
//         this.state.moves.length === 0
//           ? 1
//           : this.state.moves[this.state.moves.length - 1].player === 1
//           ? 2
//           : 1;

//       this.state.moves.push({
//         player: currentPlayer,
//         gameField: +e.target.id,
//       });

//       const squareIcon = document.createElement('i');

//       if (currentPlayer === 1) {
//         squareIcon.classList.add('fa-solid', 'fa-x', 'yellow');
//         this.$.turn.classList.remove('yellow');
//         this.$.turn.classList.add('turquoise');
//       } else {
//         squareIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
//         this.$.turn.classList.remove('turquoise');
//         this.$.turn.classList.add('yellow');
//       }

//       this.$.turn.innerHTML = `
//         <i class="fa-solid fa-${currentPlayer === 1 ? 'o' : 'x'}"></i>
//         <p>Player ${currentPlayer}, you're up!</p>
//       `;

//       e.target.append(squareIcon);
//       const game = this.getGameStatus(this.state.moves);
//       if (game.status === 'complete') {
//         this.$.modal.classList.remove('hidden');
//         let text;
//         if (game.winner) {
//           text = `Player ${game.winner} wins!`;
//         } else {
//           text = `Tie!`;
//         }
//         this.$.modalText.textContent = text;
//       }
//     });
//   },
//   init() {
//     this.registerEventListeners();
//   },
// };

// window.addEventListener('load', App.init.bind(App));

function init() {
  const view = new View();

  view.bindNewRoundEvent((event) => {
    console.log('New Round');
    console.log(event);
  });

  view.bindPlayAgainEvent((event) => {
    console.log('Play again');
    console.log(event);
  });

  view.bindResetEvent((event) => {
    console.log('Reset');
    console.log(event);
  });

  view.bindGameField(function (event) {
    view.showTernInfo(2);
    view.handlePlayerMove(event.target.id, 1);
  });
}
window.addEventListener('load', init);
