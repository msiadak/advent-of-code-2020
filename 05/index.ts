import * as fs from 'fs';

let boardingPasses = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n');

let highestSeatId = -Infinity;

function seatId(row: number, col: number) {
  return row * 8 + col;
}

const seatIds: number[] = [];

boardingPasses.forEach((boardingPass) => {
  let lowRow = 0;
  let highRow = 127;
  let range = 128;

  for (let i = 0; i < 7; i++) {
    range /= 2;
    if (boardingPass[i] === 'F') {
      highRow -= range;
    } else {
      lowRow += range;
    }
  }

  let lowCol = 0;
  let highCol = 7;
  range = 8;

  for (let i = 7; i < 10; i++) {
    range /= 2;
    if (boardingPass[i] === 'R') {
      lowCol += range;
    } else {
      highCol -= range;
    }
  }

  console.log(boardingPass);
  console.log({ lowRow, highRow, lowCol, highCol });
  highestSeatId = Math.max(highestSeatId, seatId(lowRow, lowCol));
  seatIds.push(seatId(lowRow, lowCol));
});

seatIds.sort((a, b) => a - b);
for (let i = 1; i < seatIds.length; i++) {
  if (seatIds[i] - seatIds[i - 1] === 2) {
    console.log(seatIds[i] - 1);
  }
}
console.log({ highestSeatId });
