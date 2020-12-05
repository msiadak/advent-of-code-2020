import * as fs from 'fs';

const treeMap = fs.readFileSync(`${__dirname}/input`).toString().split('\n');

const TREE = '#';

function countTrees(map: string[], right: number, down: number): number {
  const width = map[0].length;
  const height = map.length;

  let x = 0;
  let y = 0;
  let numTrees = 0;

  while (y < height) {
    if (map[y][x] === TREE) {
      numTrees++;
    }

    x = (x + right) % width;
    y += down;
  }

  return numTrees;
}

console.log('Part 1 answer:', countTrees(treeMap, 3, 1));

console.log(
  'Part 2 answer:',
  countTrees(treeMap, 1, 1) *
    countTrees(treeMap, 3, 1) *
    countTrees(treeMap, 5, 1) *
    countTrees(treeMap, 7, 1) *
    countTrees(treeMap, 1, 2)
);
