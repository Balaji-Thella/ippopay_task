const strongPasswordChecker = require("./script").strongPasswordChecker;
const minimumDifference = require("./script").minimumDifference;
const testCases_password = [
  { input: "a", output: 5 },
  { input: "aA1", output: 3 },
  { input: "1337C0d3", output: 0 },
];

const testCases_min_diff = [
  { input: [3, 9, 7, 3], output: 2 },
  { input: [-36, 36], output: 72 },
  { input: [2, -1, 0, 4, -2, -9], output: 0 },
];

testCases_password.forEach((testCase, index) => {
  test(`Test Case ${index + 1}`, () => {
    expect(strongPasswordChecker(testCase.input)).toEqual(testCase.output);
  });
});

testCases_min_diff.forEach((testCase, index) => {
  test(`Test Case ${index + 1}`, () => {
    expect(minimumDifference(testCase.input)).toEqual(testCase.output);
  });
});
