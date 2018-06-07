/** @flow */
const officialSeparator = ',';
const officialDelimiterStart = '//';

type NormalizeExpression = (
  input: string,
  seps: $ReadOnlyArray<string>
) => string;
const normalizeExpression: NormalizeExpression = (input, seps) => {
  return seps.reduce((acc, sep) => {
    return acc.split(sep).join(officialSeparator);
  }, input);
};

type ExtractDelimiters = (inputDelimiters: string) => string[];
const extractDelimiters: ExtractDelimiters = inputDelimiters => {
  return inputDelimiters.substr(1, inputDelimiters.length - 2).split('][');
};

type GetDelimiters = (inputDelimiters: string) => string[];
const getDelimiters: GetDelimiters = inputDelimiters => {
  const inputDelimitersWithoutEscapeChar = inputDelimiters.substr(2);
  const isSimpleDelimiter = inputDelimitersWithoutEscapeChar.length === 1;
  if (isSimpleDelimiter) {
    return [inputDelimitersWithoutEscapeChar[0]];
  } else {
    return extractDelimiters(inputDelimitersWithoutEscapeChar);
  }
};

type ParsedInput = {
  expression: string,
  delimiters: string[],
};
type ParseInput = (input: string) => ParsedInput;
const parseInput: ParseInput = input => {
  if (input.startsWith(officialDelimiterStart)) {
    return {
      expression: input.split('\n')[1],
      delimiters: getDelimiters(input.split('\n')[0]),
    };
  } else {
    return { expression: input, delimiters: ['\n'] };
  }
};

type ConvertToInt = (e: string) => number;
const convertToInt: ConvertToInt = e => parseInt(e);

type ExtractOperands = (expression: string) => number[];
const extractOperands: ExtractOperands = expression =>
  expression.split(',').map(convertToInt);

type AssertOperandsAreNotNegatives = (operands: $ReadOnlyArray<number>) => void;
const assertOperandsAreNotNegatives: AssertOperandsAreNotNegatives = operands =>
  operands.forEach(operand => {
    const isNegative = operand => operand < 0;
    if (isNegative(operand)) {
      throw new Error('negatives not allowed');
    }
  });

type RemoveBigOperands = (operands: $ReadOnlyArray<number>) => number[];
const removeBigOperands: RemoveBigOperands = operands => {
  const isGreaterThanAThousand = operand => operand < 1000;
  return operands.filter(isGreaterThanAThousand);
};

type Sum = (operands: $ReadOnlyArray<number>) => number;
const sum: Sum = operands =>
  operands.reduce((result, operand) => result + operand, 0);

type AddNumbers = (input: string) => number;
const addNumbers: AddNumbers = input => {
  const { delimiters, expression } = parseInput(input);
  const normalizedExpression = normalizeExpression(expression, delimiters);
  const operands = extractOperands(normalizedExpression);
  assertOperandsAreNotNegatives(operands);
  const operandsToSum = removeBigOperands(operands);
  return sum(operandsToSum);
};

export { addNumbers as default };
