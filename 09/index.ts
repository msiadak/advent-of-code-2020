import * as fs from 'fs';

const nums = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n')
  .map((line) => Number(line));

let invalidNumber;

for (let i = 25; i < nums.length; i++) {
  const prev25 = nums.slice(i - 25, i);
  const target = nums[i];
  const seen = new Set<number>();
  let found = false;
  for (const cur of prev25) {
    if (seen.has(target - cur)) {
      found = true;
      break;
    }
    seen.add(cur);
  }
  if (!found) {
    invalidNumber = target;
    break;
  }
}

if (typeof invalidNumber !== 'number') {
  throw new Error();
}

console.log('Part 1:', invalidNumber);

let windowStart = 0,
  windowSize = 1;
let sum = nums[windowStart];

while (windowStart + windowSize < nums.length) {
  if (sum === invalidNumber) {
    const range = nums.slice(windowStart, windowStart + windowSize - 1);
    range.sort((a, b) => a - b);
    console.log('Part 2:', range[0] + range[range.length - 1]);
    break;
  } else if (sum < invalidNumber) {
    windowSize++;
    sum += nums[windowStart + windowSize - 1];
  } else {
    sum -= nums[windowStart];
    windowStart++;
    if (windowSize > 1) {
      windowSize--;
    }
  }
}
