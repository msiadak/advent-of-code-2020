import * as fs from 'fs';

interface BagMap {
  [bagDescription: string]: {
    [bagDescription: string]: number;
  };
}

const bagMap = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n')
  .reduce<BagMap>((acc, line) => {
    const key = line.slice(0, line.indexOf('bags') - 1);
    acc[key] = {};

    if (line.endsWith('no other bags.')) {
      return acc;
    }

    line
      .split('contain')[1]
      .trim()
      .split(', ')
      .forEach((description) => {
        const innerKey = description.slice(2, description.indexOf('bag') - 1);
        acc[key][innerKey] = parseInt(description[0], 10);
      });
    return acc;
  }, {});

const memo = new Set<string>();

function hasShinyGold(bagDescription: string) {
  if (memo.has(bagDescription)) {
    return true;
  }

  if (bagMap[bagDescription].hasOwnProperty('shiny gold')) {
    memo.add(bagDescription);
    return true;
  }

  for (const containedBag of Object.keys(bagMap[bagDescription])) {
    if (hasShinyGold(containedBag)) {
      memo.add(containedBag);
      return true;
    }
  }

  return false;
}

let found = 0;
for (const description of Object.keys(bagMap)) {
  if (hasShinyGold(description)) {
    found++;
  }
}

console.log(found);
