const fs = require('fs');

const crabmarines = fs

  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split(',')
  .map(Number)
  .sort((a, b) => a - b);

// PART ONE
// find all the possible fuel costs and take the lowest one

function arrangeCrabmarines(pos) {
  let distanceMoved = 0;
  let fuelSpent = 0;
  for (i = 0; i < crabmarines.length; i++) {
    distanceMoved += Math.abs(crabmarines[i] - pos);
  }
  return fuelSpent;
}

//PART TWO use arthmetic progression to find new fuel cost, map the crabmarines array though it and find the lowest value of those
function findFuelCosts() {
  const highestPosition = crabmarines[crabmarines.length - 1];
  const possibleFuelCosts = Array(highestPosition).fill(0);

  for (i = 0; i < highestPosition; i++) {
    const cost = crabmarines
      .map(
        (position) =>
          (Math.abs(position - i) * (1 + Math.abs(position - i))) / 2
      )
      .reduce((a, b) => a + b, 0);
    possibleFuelCosts[i] = cost;
  }
  console.log(Math.min(...possibleFuelCosts));
}

findFuelCosts();
