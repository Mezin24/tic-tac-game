export type Player = {
  id: number;
  name: string;
  iconClass: string;
  colorClass: string;
};

export type Move = {
  squareId: number;
  player: Player;
};

export type GameStatus = {
  isCompleted: boolean;
  winner: Player;
};

export type Game = {
  moves: Move[];
  status: GameStatus;
};

export type GameState = {
  moves: Move[];
  history: {
    currentRoundGames: Game[];
    allGames: Game[];
  };
};
