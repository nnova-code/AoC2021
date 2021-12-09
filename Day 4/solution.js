// parse input

const fs = require('fs');

//NOT WORKING: Sample works but input does not. Actual answer should be 12080. Will come back to this one when I have acquired bigger brain
const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n\n');

const drawnNumbers = lines[0].split(',').map((n) => parseInt(n));

// set up the bingo card
const cards = lines.slice(1).map((card) =>
  card
    .split('\n')
    .filter((l) => l.length > 0)
    .map((row) =>
      Array.from(row.matchAll(/\d+/g)).map((cell) => ({
        num: parseInt(cell[0]),
        marked: false,
      }))
    )
);
function markNumbers(card, num) {
  for (const row of card) {
    for (const cell of row) {
      if (cell.num === num) {
        cell.marked = true;
        return true;
      }
    }
  }
  return false;
}

function cardWon(card) {
  for (const row of card) {
    if (row.every((cell) => cell.marked)) {
      return true;
    }
  }
  for (let i = 0; i < 5; i++) {
    let colMatch = true;
    for (let j = 0; j < 5; j++) {
      if (!card[i][j].marked) {
        colMatch = false;
        break;
      }
    }
    if (colMatch) return true;
  }
  return false;
}

let winningCard;
let lastNumber = 0;

// check all numbers until a card wins
for (const num of drawnNumbers) {
  console.log(num);
  lastNumber = num;
  let finished = false;
  for (const card of cards) {
    const match = markNumbers(card, num);

    if (match && cardWon(card)) {
      finished = true;
      winningCard = card;
      break;
    }
  }
  if (finished) {
    break;
  }
}

if (!winningCard) {
  throw new Error('No winning card found!');
}

//add up all the unmarked numbers on the winning board
const cardSum = winningCard.reduce((sum, row) => {
  for (const cell of row) {
    if (!cell.marked) {
      sum += cell.num;
    }
  }
  return sum;
}, 0);

const score = cardSum * lastNumber;

console.log(winningCard);

console.log(cardSum, lastNumber, score);
