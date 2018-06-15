// @flow
import primeOf from "../primeFactor";

describe("prime factors", () => {
  it("should return empty array when no prime factor", () => {
    const foundResult = primeOf(1);
    const expectedResult = [];
    expect(foundResult).toEqual(expectedResult);
  });
  it("should return a non empty array when there is a prime factor", () => {
    const foundResult = primeOf(2);
    const expectedResult = [2];
    expect(foundResult).toEqual(expectedResult);
  });

  it("should return a non empty array when there is a prime factor", () => {
    const foundResult = primeOf(4);
    const expectedResult = [2, 2];
    expect(foundResult).toEqual(expectedResult);
  });

  it("should return a non empty array when there is a prime factor", () => {
    const foundResult = primeOf(6);
    const expectedResult = [2, 3];
    expect(foundResult).toEqual(expectedResult);
  });

  it("should return a non empty array when there is a prime factor", () => {
    const foundResult = primeOf(8);
    const expectedResult = [2, 2, 2];
    expect(foundResult).toEqual(expectedResult);
  });

  it("should return a non empty array when there is a prime factor", () => {
    const foundResult = primeOf(9);
    const expectedResult = [3, 3];
    expect(foundResult).toEqual(expectedResult);
  });

  it("should return a non empty array when there is a prime factor", () => {
    const foundResult = primeOf(25);
    const expectedResult = [5, 5];
    expect(foundResult).toEqual(expectedResult);
  });

  it("should return a non empty array when there is a prime factor", () => {
    const foundResult = primeOf(49);
    const expectedResult = [7, 7];
    expect(foundResult).toEqual(expectedResult);
  });

  it("should return a non empty array when there is a prime factor", () => {
    const foundResult = primeOf(169);
    const expectedResult = [13, 13];
    expect(foundResult).toEqual(expectedResult);
  });

  it("should return a non empty array when there is a prime factor", () => {
    const foundResult = primeOf(225);
    const expectedResult = [3, 3, 5, 5];
    expect(foundResult).toEqual(expectedResult);
  });
});
