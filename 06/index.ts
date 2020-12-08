import * as fs from 'fs';

let groups = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n')
  .reduce<Array<Set<string>>>(
    (acc, line) => {
      if (line === '') {
        acc.push(new Set());
      } else {
        const currentSet = acc[acc.length - 1];
        for (const char of line) {
          currentSet.add(char);
        }
      }
      return acc;
    },
    [new Set()]
  );

let sumOfCounts = 0;
for (const group of groups) {
  sumOfCounts += group.size;
}

console.log(sumOfCounts);
