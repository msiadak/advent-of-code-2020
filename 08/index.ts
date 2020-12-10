import * as fs from 'fs';

type Instruction = 'acc' | 'jmp' | 'nop';
type Program = [Instruction, number][];
enum ReturnCode {
  Complete,
  InfiniteLoop,
}

function parseProgram(programLines: string[]): Program {
  return programLines.map((line) => {
    const components = line.split(' ');
    if (components.length !== 2) {
      throw new Error('invalid line while parsing: ' + line);
    }
    const [instruction, stringArg] = components;
    const numberArg = Number(stringArg);
    if (
      (instruction === 'acc' ||
        instruction === 'jmp' ||
        instruction === 'nop') &&
      !Number.isNaN(numberArg)
    ) {
      return [instruction, numberArg];
    } else {
      throw new Error(
        'invalid instruction while parsing program: ' + instruction
      );
    }
  });
}

function runProgram(program: Program): [ReturnCode, number, Set<number>] {
  let pointer = 0;
  let acc = 0;
  const visited = new Set<number>();

  while (pointer < program.length) {
    visited.add(pointer);
    const [instruction, argument] = program[pointer];

    switch (instruction) {
      case 'jmp':
        pointer += argument;
        break;
      case 'acc':
        pointer++;
        acc += argument;
        break;
      default:
        pointer++;
    }

    if (visited.has(pointer)) {
      return [ReturnCode.InfiniteLoop, acc, visited];
    }
  }

  return [ReturnCode.Complete, acc, visited];
}

const originalProgram = parseProgram(
  fs.readFileSync(`${__dirname}/input`).toString().split('\n')
);

const [, acc, visited] = runProgram(originalProgram);

console.log('Part 1 answer:', acc);

for (const index of visited) {
  if (originalProgram[index][0] === 'acc') {
    continue;
  }

  const modifiedProgram: Program = originalProgram.map((line) => [...line]);

  if (originalProgram[index][0] === 'jmp') {
    modifiedProgram[index][0] = 'nop';
  } else {
    modifiedProgram[index][0] = 'jmp';
  }

  const [returnCode, acc] = runProgram(modifiedProgram);
  if (returnCode === ReturnCode.Complete) {
    console.log('Part 2 answer:', acc);
    break;
  }
}
