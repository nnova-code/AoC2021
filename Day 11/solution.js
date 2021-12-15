const fs = require('fs');

const octs = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .split('\n')
  .filter(Boolean);

// use same grid from Day 9
const octopiGrid = octs.map((line, x) =>
  line.split('').map((num, y) => {
    const energyLevel = parseInt(num);
    return { energyLevel, x, y };
  })
);

const numberOfOctopi = octopiGrid[0].length * octopiGrid.length;
let totalFlashes = 0;
let stepCount = 0;
let firstSimultaneousFlash;

//octopi energy increaser function
function disperseFlashEnergy(octopiGrid, x, y) {
  if (x >= 0 && x < octopiGrid[0].length) {
    if (y >= 0 && y < octopiGrid.length) {
      // unless they are at 0 (flashed already)
      if (octopiGrid[x][y].energyLevel !== 0) {
        octopiGrid[x][y].energyLevel++;
      }
    }
  }
}

function doStep(octopiGrid) {
  stepCount++;
  let flashes = 0;

  //energy level of each octopus increases by 1
  for (let x = 0; x < octopiGrid[0].length; x++) {
    for (let y = 0; y < octopiGrid.length; y++) {
      octopiGrid[x][y].energyLevel++;
    }
  }

  let flashed;
  do {
    flashed = false;

    for (let x = 0; x < octopiGrid[0].length; x++) {
      for (let y = 0; y < octopiGrid.length; y++) {
        // octopi at 9 flash and use all their energy
        if (octopiGrid[x][y].energyLevel > 9) {
          octopiGrid[x][y].energyLevel = 0;

          // increase the energy level of all adjacent octopi by 1
          disperseFlashEnergy(octopiGrid, x - 1, y - 1);
          disperseFlashEnergy(octopiGrid, x - 1, y);
          disperseFlashEnergy(octopiGrid, x - 1, y + 1);
          disperseFlashEnergy(octopiGrid, x, y - 1);
          disperseFlashEnergy(octopiGrid, x, y + 1);
          disperseFlashEnergy(octopiGrid, x + 1, y - 1);
          disperseFlashEnergy(octopiGrid, x + 1, y);
          disperseFlashEnergy(octopiGrid, x + 1, y + 1);

          flashed = true;
          flashes++;
        }
      }
      if (
        typeof firstSimultaneousFlash === 'undefined' &&
        flashes === numberOfOctopi
      ) {
        firstSimultaneousFlash = stepCount;
      }
    }
  } while (flashed);

  return flashes;
}
for (let step = 0; step < 100; step++) {
  totalFlashes += doStep(octopiGrid);
}

console.log(totalFlashes);

if (typeof firstSimultaneousFlash === 'undefined') {
  while (typeof firstSimultaneousFlash === 'undefined') {
    doStep(octopiGrid);
  }
}

console.log(firstSimultaneousFlash);
