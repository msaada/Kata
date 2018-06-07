// @flow
import { computeFinalScore } from "../score";

describe("score", () => {
  it("should return love-love when no player score", () => {
    //given
    const playerScores = [];
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("love-love");
  });
  it("should return love-fifteen when player 2 score one point", () => {
    //given
    const playerScores = [2];
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("love-fifteen");
  });

  it("should return love-thirty when player 2 scores two points", () => {
    //given
    const playerScores = [2, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("love-thirty");
  });

  it("should return love-forty when player 2 scores three points", () => {
    //given
    const playerScores = [2, 2, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("love-forty");
  });

  it("should return fifteen-fifteen when each player scores one point", () => {
    //given
    const playerScores = [1, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("fifteen-fifteen");
  });

  it("should return deuce when player 1 and 2 score 3 points each", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("deuce");
  });
  it("should return deuce when player 1 and 2 score at least 3 points and the scores are equal", () => {
    //given
    const playerScores = [1, 1, 1, 2, 2, 2, 1, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("deuce");
  });

  it("should return 'player1 won' when there is no deuce during game", () => {
    //given
    const playerScores = [1, 1, 1, 1];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("player1 won");
  });

  it("should return 'player2 won' when there is no deuce during game", () => {
    //given
    const playerScores = [2, 2, 2, 2];
    //when
    const score = computeFinalScore(playerScores);
    //then
    expect(score).toEqual("player2 won");
  });

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
});
