import * as fs from 'fs';

const treeMap = fs.readFileSync(`${__dirname}/input`).toString().split('\n');

const TREE = '#';

function countTrees1(map: string[]): number {
  const width = map[0].length;
  const height = map.length;

  let x = 0;
  let y = 0;
  let numTrees = 0;

  while (y < height) {
    if (map[y][x] === TREE) {
      numTrees++;
    }

    x = (x + 3) % width;
    y += 1;
  }

  return numTrees;
}

console.log(countTrees1(treeMap));
