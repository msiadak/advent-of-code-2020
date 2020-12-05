import * as fs from 'fs';
import { validatePassport } from './validators';

const input = fs.readFileSync(`${__dirname}/input`).toString().split('\n');

const passports = input.reduce<Record<string, string>[]>((acc, line, index) => {
  if (line === '') return acc;

  if (index === 0 || input[index - 1] === '') {
    acc.push({});
  }

  const rawPairsInLine = line.split(' ');
  for (const pair of rawPairsInLine) {
    const [key, value] = pair.split(':');
    acc[acc.length - 1][key] = value;
  }
  return acc;
}, []);

export interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
}

let validPassports = 0;
passports.forEach((passport) => {
  if (validatePassport(passport)) {
    validPassports++;
  }
});

console.log(validPassports);
