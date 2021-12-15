const fs = require('fs');

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .split('\n')
  .filter(Boolean);

function part1() {
  const closingChar = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>',
  };

  const errorScore = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  const misplacedChar = {
    ')': 0,
    ']': 0,
    '}': 0,
    '>': 0,
  };

  for (const line of lines) {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (/[({|[<]/.test(char)) {
        stack.push(closingChar[char]);
      } else {
        const expected = stack.pop();
        if (expected !== char) {
          misplacedChar[char]++;
          break;
        }
      }
    }
  }

  const score = Object.keys(misplacedChar)
    .map((key) => errorScore[key] * misplacedChar[key])
    .reduce((a, b) => a + b, 0);

  console.log(score);
}

part1();

function part2() {
  const closingChar = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>',
  };

  const completionScore = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };

  const points = [];

  function median(arr) {
    const pointsArr = [...arr];
    pointsArr.sort((a, b) => a - b);

    return pointsArr[(pointsArr.length - 1) / 2];
  }

  for (const line of lines) {
    const stack = [];
    let corrupted = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (/[({|[<]/.test(char)) {
        stack.push(closingChar[char]);
      } else {
        const expected = stack.pop();
        if (expected !== char) {
          corrupted = true;
          break;
        }
      }
    }
    if (!corrupted && stack.length > 0) {
      const closingChars = stack.reverse().join('');
      let score = 0;
      for (let i = 0; i < closingChars.length; i++) {
        const cChar = closingChars[i];
        score *= 5;
        score += completionScore[cChar];
      }
      points.push(score);
    }
  }
  console.log(median(points));
}

part2();
