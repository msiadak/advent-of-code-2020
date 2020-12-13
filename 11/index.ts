import * as fs from 'fs';

const Floor = '.';
const EmptySeat = 'L';
const OccupiedSeat = '#';

type SeatingChart = (typeof Floor | typeof EmptySeat | typeof OccupiedSeat)[][];

const seatingChart = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n')
  .map((line) => {
    const chars = line.split('');
    for (const char of chars) {
      if (!(char === '.' || char === 'L' || char === '#')) {
        throw new Error('Invalid character found in input: ' + char);
      }
    }
    return chars;
  }) as SeatingChart;

function findStableState(
  chart: SeatingChart,
  adjacentSeatsCallback: (
    chart: SeatingChart,
    row: number,
    col: number
  ) => number,
  minAdjacentSeats: number
): SeatingChart {
  const newChart: SeatingChart = chart.map((line) => [...line]);

  let changes: [
    row: number,
    col: number,
    newState: typeof EmptySeat | typeof OccupiedSeat
  ][] = [];
  do {
    // Apply changes from last iteration
    for (const [row, col, newState] of changes) {
      newChart[row][col] = newState;
    }
    changes = [];

    // Find next changes
    for (let row = 0; row < newChart.length; row++) {
      for (let col = 0; col < newChart[0].length; col++) {
        if (newChart[row][col] === Floor) {
          continue;
        }

        let adjacentOccupiedSeats = adjacentSeatsCallback(newChart, row, col);
        if (adjacentOccupiedSeats === 0 && newChart[row][col] === EmptySeat) {
          changes.push([row, col, OccupiedSeat]);
        } else if (
          adjacentOccupiedSeats >= minAdjacentSeats &&
          newChart[row][col] === OccupiedSeat
        ) {
          changes.push([row, col, EmptySeat]);
        }
      }
    }
  } while (changes.length > 0);

  return newChart;
}

function countOccupiedSeats(chart: SeatingChart): number {
  let occupiedSeats = 0;

  for (let row = 0; row < chart.length; row++) {
    for (let col = 0; col < chart[0].length; col++) {
      if (chart[row][col] === OccupiedSeat) {
        occupiedSeats++;
      }
    }
  }

  return occupiedSeats;
}

function countAdjacentOccupiedSeats(
  chart: SeatingChart,
  row: number,
  col: number
) {
  let occupiedSeats = 0;

  for (let adjRow = row - 1; adjRow <= row + 1; adjRow++) {
    for (let adjCol = col - 1; adjCol <= col + 1; adjCol++) {
      if (
        (adjRow === row && adjCol === col) ||
        adjRow < 0 ||
        adjRow > chart.length - 1 ||
        adjCol < 0 ||
        adjCol > chart[0].length - 1
      ) {
        continue;
      }

      if (chart[adjRow][adjCol] === OccupiedSeat) {
        occupiedSeats++;
      }
    }
  }

  return occupiedSeats;
}

function countVisibleOccupiedSeats(
  chart: SeatingChart,
  row: number,
  col: number
) {
  let visibleOccupiedSeats = 0;

  for (let rowChange = -1; rowChange <= 1; rowChange++) {
    for (let colChange = -1; colChange <= 1; colChange++) {
      if (rowChange === 0 && colChange === 0) {
        continue;
      }

      let currentRow = row + rowChange;
      let currentCol = col + colChange;

      while (
        currentRow >= 0 &&
        currentRow < chart.length &&
        currentCol >= 0 &&
        currentCol < chart[0].length
      ) {
        if (chart[currentRow][currentCol] === OccupiedSeat) {
          visibleOccupiedSeats++;
          break;
        } else if (chart[currentRow][currentCol] === EmptySeat) {
          break;
        }
        currentRow += rowChange;
        currentCol += colChange;
      }
    }
  }

  return visibleOccupiedSeats;
}

console.log(
  'Part 1 answer:',
  countOccupiedSeats(
    findStableState(seatingChart, countAdjacentOccupiedSeats, 4)
  )
);

console.log(
  'Part 2 answer:',
  countOccupiedSeats(
    findStableState(seatingChart, countVisibleOccupiedSeats, 5)
  )
);
