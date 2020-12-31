const usage = `Usage: npm run day XX\nReplace XX with an exercise number (e.g. npm run day 01 for day 1)`;

const day = process.argv[2];
const dayInt = parseInt(day, 10);

if (/^[0-2][0-9]$/.test(day) && dayInt >= 1 && dayInt <= 25) {
  require(`./${day}`);
} else {
  console.error(`Invalid day: ${day}`);
  console.info(usage);
}
