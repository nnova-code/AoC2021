const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n');

function getCount(input) {
  let zeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let ones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const line of input) {
    const bits = [...line];
    bits.forEach((bit, index) => {
      if (bit === '0') {
        zeros[index]++;
      } else {
        ones[index]++;
      }
    });
  }
  return { zeros, ones };
}

function getOxygenGenerator(input, index = 0) {
  const { zeros, ones } = getCount(input);
  let mostCommonBit = '1';
  if (zeros[index] > ones[index]) {
    mostCommonBit = '0';
  }
  const filtered = input.filter((line) => line[index] === mostCommonBit);

  if (filtered.length === 1) {
    return filtered[0];
  }
  return getOxygenGenerator(filtered, index + 1);
}

function getCo2Scrubber(input, index = 0) {
  const { zeros, ones } = getCount(input);
  let leastCommonBit = '0';
  if (zeros[index] > ones[index]) {
    leastCommonBit = '1';
  }
  const filtered = input.filter((line) => line[index] === leastCommonBit);
  if (filtered.length === 1) {
    return filtered[0];
  }
  return getCo2Scrubber(filtered, index + 1);
}

function getLifeSupportRating() {
  // filter out values by index, keeping only values with most common bit
  let oxygenGenerator = getOxygenGenerator(input);

  //filter out values by index, keeping only values with least common bit
  let co2Scrubber = getCo2Scrubber(input);

  const oxygenGeneratorRating = parseInt(oxygenGenerator, 2);
  const co2ScrubberRating = parseInt(co2Scrubber, 2);

  const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;

  console.log(oxygenGeneratorRating * co2ScrubberRating);
}

getLifeSupportRating();
