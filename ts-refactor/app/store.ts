import { GameState, Player } from './types';

const initialValue = {
  moves: [],
  history: {
    currentRoundGames: [],
    allGames: [],
  },
};

export default class Store extends EventTarget {
  constructor(readonly storageKey: string, readonly players: Player[]) {
    super();
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
        if (pattern.every((v) => selectedSquareIds.indexOf(v) !== -1)) {
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

  get stats() {
    const state = this.#getState();
    return {
      playerWins: this.players.map((player) => {
        const wins = state.history.currentRoundGames.filter(
          (round) => round.status.winner?.id === player.id
        ).length;

        return {
          ...player,
          wins,
        };
      }),
      ties: state.history.currentRoundGames.filter(
        (round) => round.status.winner === null
      ).length,
    };
  }

  playMove(squareId: number) {
    const store = structuredClone(this.#getState());
    store.moves.push({
      squareId,
      player: this.game.currentPlayer,
    });

    this.#setState(store);
  }

  reset() {
    const stateClone = structuredClone(this.#getState());
    const { moves, status } = this.game;

    if (status.isCompleted) {
      stateClone.history.currentRoundGames.push({
        moves,
        status,
      });
    }

    stateClone.moves = [];
    this.#setState(stateClone);
  }

  newRound() {
    this.reset();
    const stateClone = structuredClone(this.#getState()) as GameState;
    stateClone.history.allGames = [
      ...stateClone.history.allGames,
      ...stateClone.history.currentRoundGames,
    ];
    stateClone.history.currentRoundGames = [];
    this.#setState(stateClone);
  }

  #getState() {
    const state = localStorage.getItem(this.storageKey);
    return state ? (JSON.parse(state) as GameState) : initialValue;
  }

  #setState(stateOrFn: GameState | ((prevState: GameState) => GameState)) {
    const prevState = this.#getState();
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

    localStorage.setItem(this.storageKey, JSON.stringify(newState));
    this.dispatchEvent(new Event('statechange'));
  }
}
