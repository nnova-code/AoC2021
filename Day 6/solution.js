const fs = require('fs');

const fishes = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .replace(/[\r\n]/g, '')
  .split(',')
  .map(Number);

function part1() {
  const queue = Array(9).fill(0);
  for (const fish of fishes) {
    queue[fish]++;
  }
  for (let i = 0; i < 256; i++) {
    const currentFishes = queue.shift();
    queue.push(currentFishes);
    queue[6] += currentFishes;
  }

  console.log(queue.reduce((a, b) => a + b, 0));
}

part1();
