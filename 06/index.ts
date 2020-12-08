import * as fs from 'fs';

let inputLines = fs.readFileSync(`${__dirname}/input`).toString().split('\n');

let numGroupsAllAnsweredYes = 0;

for (let i = 0; i < inputLines.length; i++) {
  const currentSet = new Set();
  let groupStartIndex = i;

  while (inputLines[i] !== '') {
    if (groupStartIndex === i) {
      for (const char of inputLines[i]) {
        currentSet.add(char);
      }
    } else {
      const newSet = new Set();
      for (const char of inputLines[i]) {
        newSet.add(char);
      }
      for (const char of currentSet) {
        if (!newSet.has(char)) {
          currentSet.delete(char);
        }
      }
    }
    i++;
  }

  numGroupsAllAnsweredYes += currentSet.size;
}

console.log(numGroupsAllAnsweredYes);
