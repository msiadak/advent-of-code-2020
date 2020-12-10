import * as fs from 'fs';

const adapters = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n')
  .map((line) => Number(line));

adapters.sort((a, b) => a - b);

adapters.unshift(0);
adapters.push(adapters[adapters.length - 1] + 3);

let oneJoltDiffs = 0;
let threeJoltDiffs = 0;

for (let i = 1; i < adapters.length; i++) {
  const diff = adapters[i] - adapters[i - 1];
  if (diff === 1) {
    oneJoltDiffs++;
  } else if (diff === 3) {
    threeJoltDiffs++;
  }
}

console.log('Part 1:', oneJoltDiffs * threeJoltDiffs);

const finalJoltage = adapters[adapters.length - 1];
const dp = new Array(finalJoltage + 1).fill(0);
dp[0] = 1;
const adapterSet = new Set(adapters);

for (const adapter of adapters) {
  if (adapterSet.has(adapter + 1)) {
    dp[adapter + 1] += dp[adapter];
  }
  if (adapterSet.has(adapter + 2)) {
    dp[adapter + 2] += dp[adapter];
  }
  if (adapterSet.has(adapter + 3)) {
    dp[adapter + 3] += dp[adapter];
  }
}

console.log(dp[finalJoltage]);
