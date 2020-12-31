import * as fs from 'fs';

const inputLines = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n');

const earliestDeparture = Number(inputLines[0]);
const buses = inputLines[1].split(',').filter(bus => bus !== 'x').map(bus => Number(bus));
let chosenDepartureTime = Infinity;
let chosenBus: number;
console.log({ earliestDeparture, buses });

for (let bus of buses) {
  let time = Math.floor(earliestDeparture / bus) * bus + bus;
  console.log({ time, bus });
  if (time < chosenDepartureTime) {
    chosenDepartureTime = time;
    chosenBus = bus;
  }
}

console.log((chosenBus! * (chosenDepartureTime - earliestDeparture)));

/*

10
3

*/