const fs = require('fs');

const lines = fs
  .readFileSync('sample.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .split('\n')
  .filter(Boolean);
