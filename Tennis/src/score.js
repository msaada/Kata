// @flow

type playerScore = 1 | 2;

const humanReadableScores = {
  0: "love",
  1: "fifteen",
  2: "thirty",
  3: "forty"
};

export function computeFinalScore(playerScores: playerScore[]): string {
  let gapBetweenPlayer1And2 = 0;
  let player1Points = 0;
  let player2Points = 0;
  for (let score of playerScores) {
    if (score === 1) {
      gapBetweenPlayer1And2 += 1;
      player1Points += 1;
    } else {
      gapBetweenPlayer1And2 -= 1;
      player2Points += 1;
    }
    if (player2Points > 3 && gapBetweenPlayer1And2 < -1) {
      return "player2 won";
    }
    if (player1Points > 3 && gapBetweenPlayer1And2 > 1) {
      return "player1 won";
    }
  }
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
  }
}
