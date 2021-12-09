const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .toString()
  .split('\n');
const forwardArr = [];
const downArr = [];
const upArr = [];

//split the entries into arrays depending on their direction
for (i = 0; i < input.length; i++) {
  if (input[i].includes('forward')) {
    forwardArr.push(input[i]);
  } else if (input[i].includes('down')) {
    downArr.push(input[i]);
  } else if (input[i].includes('up')) {
    upArr.push(input[i]);
  }
}

//extract the number values and add them together to get the total value of all entries of that type

const horPos = forwardArr
  .map((x) => parseInt(x.replace(/^\D+/g, '')))
  .reduce((par, a) => par + a, 0);

const downVal = downArr
  .map((x) => parseInt(x.replace(/^\D+/g, '')))
  .reduce((par, a) => par + a, 0);

const upVal = upArr
  .map((x) => parseInt(x.replace(/^\D+/g, '')))
  .reduce((par, a) => par + a, 0);

// find depth by subtracting the two values
const depth = downVal - upVal;

const result = horPos * depth;

console.log(
  'A horizontal position of ' +
    horPos +
    ' multiplied by a depth of ' +
    depth +
    ' gives  ' +
    result +
    ' as the answer to part 1.'
);

// ~~~~~~ PART 2

// This is where I realized I should have been creating an object to pass through my loop instead of handling all the properties individually! the first part was solvable that way but the second part was not as we need to change the properties line by line to get the right aim value. I am leaving Part 1 instead of refectoring so I can look back later and see my learning process.

//create a new array consisting of arrays of the direction and the number value

const input1 = input
  .filter((x) => Boolean(x))
  .map((each) => {
    //destructure each array into an object instead of ripping the values out using regex

    const [direction, number] = each.split(` `);
    return {
      direction,
      numVal: parseInt(number),
    };
  });

//Use a switch case to change the submarine's properties line by line.

let submarine = {
  horPos: 0,
  depth: 0,
  aim: 0,
};

// after reviewing other solutions it seems pretty standard to use 'lines' here instead of 'entry'

for (const entry of input1) {
  switch (entry.direction) {
    case 'forward':
      submarine.horPos += entry.numVal;
      //add the aim to the depth
      submarine.depth += submarine.aim * entry.numVal;
      break;
    case 'down':
      submarine.aim += entry.numVal;
      break;
    case 'up':
      submarine.aim -= entry.numVal;
      break;
  }
}

const result2 = submarine.horPos * submarine.depth;

console.log(
  'A horizontal position of ' +
    submarine.horPos +
    ' multiplied by a depth of ' +
    submarine.depth +
    ' gives  ' +
    result2 +
    ' as the answer to part 2.'
);
