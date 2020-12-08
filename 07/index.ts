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

console.log(
  `Number of bag types that eventually may contain a shiny gold bag: ${found}`
);

function numBagsInShinyGoldBag(): number {
  const memo: Record<string, number> = {};

  function numBags(bagDescription: string): number {
    if (memo.hasOwnProperty(bagDescription)) {
      return memo[bagDescription];
    }

    const children = bagMap[bagDescription];

    // Start with the containing bag itself
    let total = 1;
    for (const child of Object.keys(children)) {
      total += numBags(child) * children[child];
    }

    memo[bagDescription] = total;
    return total;
  }

  return numBags('shiny gold') - 1;
}

console.log(numBagsInShinyGoldBag());
