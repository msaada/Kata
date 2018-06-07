// @flow
import { computeFinalScore } from "../score";

describe("score", () => {
  // RULE 2
  /*
    The running score of each game is described in a manner peculiar to tennis: scores from zero to three points are described as “love”, “fifteen”, “thirty”, and “forty” respectively.
  */
  it("should return love-love when no player score", () => {
    //given
    const playerScores = [];
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("love-love");
  });
  it("should return fifteen-fifteen when each player scores one point", () => {
    //given
    const playerScores = [1, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("fifteen-fifteen");
  });
  it("should return thirty-thirty when each player scores two points", () => {
    //given
    const playerScores = [1, 1, 2, 2];
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("thirty-thirty");
  });

  it("should return love-forty when player 2 scores three points", () => {
    //given
    const playerScores = [2, 2, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("love-forty");
  });
  // END RULE 2

  // RULE 4
  /*
    If at least three points have been scored by each side and a player has one more point than his opponent, the score of the game is “advantage” for the player in the lead.
  */
  it("should return 'advantage player1' when player 1 scores after a deuce", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2, 1];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("advantage player1");
  });
  it("should return 'advantage player2' when player 2 scores after a deuce", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("advantage player2");
  });
  it("should return 'advantage player2' when player 2 scores after multiple deuces", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2, 1, 2, 1, 2, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("advantage player2");
  });
  it("should return 'advantage player1' when player 1 scores after multiple deuces", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2, 1, 2, 1, 2, 1];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("advantage player1");
  });
  // END RULE 4

  // RULE 3
  /*
    If at least three points have been scored by each player, and the scores are equal, the score is “deuce”.
  */
  it("should return 'deuce' when player 1 and 2 score 3 points each", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("deuce");
  });
  it("should return 'deuce' when player 1 and 2 score at least 3 points and the scores are equal", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2, 1, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("deuce");
  });
  // END RULE 3

  // RULE 1
  /*
    A game is won by the first player to have won at least four points in total and at least two points more than the opponent.
  */
  it("should return 'player1 won' when the player1 scores at least 4 points and at least 2 points more than player 2", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("player1 won");
  });
  it("should return 'player2 won' when the player2 scores at least 4 points and at least 2 points more than player 1", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 2, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("player2 won");
  });
  // END RULE 1
});
