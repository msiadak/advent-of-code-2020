import * as fs from 'fs';

const input = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n')
  .map((line) => {
    const [policyText, password] = line.split(': ');
    const [policyRangeText, policyLetter] = policyText!.split(' ');
    const [policyMin, policyMax] = policyRangeText!
      .split('-')
      .map((s) => parseInt(s, 10));

    return {
      password: password!,
      policy: {
        letter: policyLetter!,
        min: policyMin!,
        max: policyMax!,
      },
    };
  });

let validPasswords = 0;
for (const { password, policy } of input) {
  let count = 0;
  for (const letter of password) {
    if (letter === policy.letter) {
      count++;
    }
  }
  if (count >= policy.min && count <= policy.max) {
    validPasswords++;
  }
}

console.log({ validPasswords });

let validPasswords2 = 0;
for (const { password, policy } of input) {
  const { letter, min: position1, max: position2 } = policy;
  const letter1 = password[position1 - 1];
  const letter2 = password[position2 - 1];

  if (
    (letter1 === letter && letter2 !== letter) ||
    (letter1 !== letter && letter2 === letter)
  ) {
    validPasswords2++;
  }
}

console.log({ validPasswords2 });
