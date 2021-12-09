const fs = require('fs');

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map((x) => parseInt(x));

let increased = 0;

for (let i = 0; i < lines.length; i++) {
  const last = lines[i - 1];
  const current = lines[i];

  if (current > last) {
    increased++;
  }
}

console.log(increased);

//~~~~~~~~~~~~~~~~ PART TWO

let increased2 = 0;

for (let i = 3; i < lines.length; i++) {
  const lastThreeVars = lines[i - 1] + lines[i - 2] + lines[i - 3];
  const currentThreeVars = lines[i] + lines[i - 1] + lines[i - 2];
  if (currentThreeVars > lastThreeVars) {
    increased2++;
  }
}

console.log(increased2);
