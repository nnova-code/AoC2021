const fs = require('fs');

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .split('\n')
  .filter(Boolean);

function part1() {
  let risk = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const current = line[j];

      if (
        (!(i - 1 >= 0) || current < lines[i - 1][j]) &&
        (!(i + 1 < lines.length) || current < lines[i + 1][j]) &&
        (!(j - 1 >= 0) || current < lines[i][j - 1]) &&
        (!(j + 1 < line.length) || current < lines[i][j + 1])
      ) {
        risk += Number(current) + 1;
      }
    }
  }
  console.log(risk);
}

part1();

function part2() {
  // create grid of x y points, excluding 9s
  const grid = lines.map((line, x) =>
    line.split('').map((num, y) => {
      const height = parseInt(num);
      if (height === 9) return undefined;
      return { height, x, y, inBasin: false };
    })
  );

  // point grabber
  function getPointAt(x, y) {
    const row = grid[x];
    if (row) {
      return row[y];
    } else {
      return undefined;
    }
  }

  // give the points their neighbors
  for (const row of grid) {
    for (const point of row) {
      if (!point) continue;

      point.up = getPointAt(point.x, point.y + 1);
      point.down = getPointAt(point.x, point.y - 1);
      point.right = getPointAt(point.x + 1, point.y);
      point.left = getPointAt(point.x - 1, point.y);
    }
  }

  function mapBasin(root) {
    const basin = [];

    function mapBasinAt(point) {
      if (!point || point.inBasin) return;

      point.inBasin = true;
      basin.push(point);

      mapBasinAt(point.up);
      mapBasinAt(point.right);
      mapBasinAt(point.down);
      mapBasinAt(point.left);
    }

    mapBasinAt(root);

    return basin;
  }

  function findAllBasins() {
    const basins = [];

    for (const row of grid) {
      for (const point of row) {
        if (!point) continue;

        if (point.inBasin) continue;

        const basin = mapBasin(point);
        basins.push(basin);
      }
    }
    return basins;
  }

  const basins = findAllBasins();
  basins.sort((b1, b2) => b2.length - b1.length);

  const result = basins[0].length * basins[1].length * basins[2].length;

  console.log(result);
}

part2();
