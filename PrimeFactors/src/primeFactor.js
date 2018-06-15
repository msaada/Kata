// @flow

type PrimeOf = (n: number) => number[];
const primeOf: PrimeOf = n => {
  if (n === 1) return [];

  let primeFactors: number[] = [];
  for (let i = 2; i < n; i++) {
    if (!primeFactors.some(prime => i % prime === 0)) {
      if (n % i === 0) {
        primeFactors = [...primeFactors, i];
        return [i, ...primeOf(n / i)];
      }
    }
  }

  return [n];
};

export { primeOf as default };
