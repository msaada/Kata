// @flow

type ScoringPlayer = 1 | 2;
type Score = "love" | "fifteen" | "thirty" | "forty";

type ComputeGapBetweenPlayer1And2 = (
  player1Points: number,
  player2Points: number
) => number;
const computeGapBetweenPlayer1And2: ComputeGapBetweenPlayer1And2 = (
  player1Points,
  player2Points
) => player1Points - player2Points;

type ComputeUnfinishedGameScore = (
  player1Points: number,
  player2Points: number
) => string;
const computeUnfinishedGameScore: ComputeUnfinishedGameScore = (
  player1Points,
  player2Points
) => {
  const humanReadableScores: Score[] = ["love", "fifteen", "thirty", "forty"];
  const gapBetweenPlayer1And2 = computeGapBetweenPlayer1And2(
    player1Points,
    player2Points
  );

  if (player1Points > 2 && player2Points > 2 && gapBetweenPlayer1And2 === 0) {
    return "deuce";
  }
  if (player1Points < 4 && player2Points < 4) {
    return `${humanReadableScores[player1Points]}-${
      humanReadableScores[player2Points]
    }`;
  }
  if (gapBetweenPlayer1And2 < 0) {
    return "advantage player2";
  }
  if (gapBetweenPlayer1And2 > 0) {
    return "advantage player1";
  } else {
    return "Sorry I lost track of the score... :D";
  }
};

type HasPlayerAlreadyWon = (
  player1Points: number,
  player2Points: number
) => boolean;

const hasPlayer1AlreadyWon: HasPlayerAlreadyWon = (
  player1Points,
  player2Points
) => {
  return (
    player1Points > 3 &&
    computeGapBetweenPlayer1And2(player1Points, player2Points) > 1
  );
};

const hasPlayer2AlreadyWon: HasPlayerAlreadyWon = (
  player1Points,
  player2Points
) => {
  return (
    player2Points > 3 &&
    computeGapBetweenPlayer1And2(player1Points, player2Points) < -1
  );
};

type ComputeFinalScore = (whoScores: ScoringPlayer[]) => string;
const computeFinalScore: ComputeFinalScore = whoScores => {
  let player1Points = 0;
  let player2Points = 0;
  for (let score of whoScores) {
    if (score === 1) {
      player1Points += 1;
    } else {
      player2Points += 1;
    }
    if (hasPlayer1AlreadyWon(player1Points, player2Points)) {
      return "player1 won";
    }
    if (hasPlayer2AlreadyWon(player1Points, player2Points)) {
      return "player2 won";
    }
  }
  return computeUnfinishedGameScore(player1Points, player2Points);
};

export { computeFinalScore };
