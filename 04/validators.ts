import { Passport } from '.';

function validateNumberInRange(value: string, min: number, max: number) {
  const year = parseInt(value, 10);
  if (year === NaN) return false;
  return year >= min && year <= max;
}

function validateByr(byr: string) {
  return validateNumberInRange(byr, 1920, 2002);
}

function validateIyr(iyr: string) {
  return validateNumberInRange(iyr, 2010, 2020);
}

function validateEyr(eyr: string) {
  return validateNumberInRange(eyr, 2020, 2030);
}

function validateHgt(hgt: string) {
  const unit = hgt.slice(hgt.length - 2);
  const value = hgt.slice(0, hgt.length - 2);
  switch (unit) {
    case 'cm':
      return validateNumberInRange(value, 150, 193);
    case 'in':
      return validateNumberInRange(value, 59, 76);
    default:
      return false;
  }
}

function validateHcl(hcl: string) {
  return /^#[0-9a-f]{6}$/.test(hcl);
}

function validateEcl(ecl: string) {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl);
}

function validatePid(pid: string) {
  return /^[0-9]{9}$/.test(pid);
}

export function validatePassport(passport: Passport) {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;
  return (
    byr != null &&
    validateByr(byr) &&
    iyr != null &&
    validateIyr(iyr) &&
    eyr != null &&
    validateEyr(eyr) &&
    hgt != null &&
    validateHgt(hgt) &&
    hcl != null &&
    validateHcl(hcl) &&
    ecl != null &&
    validateEcl(ecl) &&
    pid != null &&
    validatePid(pid)
  );
}
