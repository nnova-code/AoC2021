const fs = require('fs');

const segments = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .toString()
  .split('\n')
  .map((x) => x.split('->').map((x) => x.split(',').map((x) => parseInt(x))))
  .map((points) => {
    return {
      x1: points[0][0],
      y1: points[0][1],
      x2: points[1][0],
      y2: points[1][1],
    };
  });

//get only hirzontal and vertical line segments
const horVertArr = segments.filter((s) => s.x1 === s.x2 || s.y1 === s.y2);

//set up grid according to the highest value found and generating an array of arrays
const maxVal = Math.max.apply(
  Math,
  segments.map((s) => Math.max.apply(Math, Object.values(s)))
);

let grid = Array(maxVal + 1)
  .fill()
  .map(() => Array(maxVal + 1).fill(0));

// increment each grid point by comparing point a & b of each segment
//// changed to include all segments for Part 2
function markGrid() {
  segments.forEach((s) => {
    let x = s.x1;
    let y = s.y1;
    grid[x][y] += 1;
    while (x !== s.x2 || y !== s.y2) {
      if (s.x2 !== s.x1) x = s.x2 >= s.x1 ? x + 1 : x - 1;
      if (s.y2 !== s.y1) y = s.y2 >= s.y1 ? y + 1 : y - 1;

      grid[x][y] += 1;
    }
  });
}

markGrid();

function findOverlap(grid) {
  let overlappedPoints = 0;
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[0].length; j++) {
      if (grid[i][j] > 1) {
        overlappedPoints += 1;
      }
    }
  }
  return overlappedPoints;
}

console.log(findOverlap(grid));
