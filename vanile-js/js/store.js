const initialValue = { moves: [] };

export default class Store {
  #state = initialValue;

  constructor(players) {
    this.players = players;
  }

  get game() {
    const state = this.#getState();
    const currentPlayer = this.players[state.moves.length % 2];

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    for (let player of this.players) {
      const selectedSquareIds = state.moves
        .filter((move) => move.player.id === player.id)
        .map((move) => move.squareId);

      for (let pattern of winningPatterns) {
        if (pattern.every((v) => selectedSquareIds.includes(v))) {
          winner = player;
        }
      }
    }

    return {
      moves: state.moves,
      currentPlayer,
      status: {
        isCompleted: state.moves.length === 9 || Boolean(winner),
        winner,
      },
    };
  }

  playMove(squareId) {
    const store = structuredClone(this.#getState());
    store.moves.push({
      squareId,
      player: this.game.currentPlayer,
    });

    this.#setState(store);
  }

  #getState() {
    return this.#state;
  }
  #setState(stateOrFn) {
    const prevState = this.#state;
    let newState;

    switch (typeof stateOrFn) {
      case 'function':
        newState = stateOrFn(prevState);
        break;
      case 'object':
        newState = stateOrFn;
        break;
      default:
        throw new Error('Invalid argument passed to saveState');
    }

    this.#state = newState;
  }
}
