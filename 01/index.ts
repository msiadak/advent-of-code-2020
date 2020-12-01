import * as fs from 'fs';

const input = fs.readFileSync(`${__dirname}/input`).toString().split('\n').map(num => parseInt(num, 10));

function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Set<number>();
  for (const num of nums) {
    const remainder = target - num;
    if (seen.has(remainder)) {
      return [num, remainder];
    }
    seen.add(num);
  }
  return null;
}

function threeSum(nums: number[], target: number): [number, number, number] | null {
  for (let i = 0; i < nums.length; i++) {
    const remainder = target - nums[i];
    const twoSumResult = twoSum(nums.slice(i+1), remainder);
    if (twoSumResult) {
      return [nums[i], ...twoSumResult];
    }
  }
  return null;
}

const [p1NumOne, p1NumTwo] = twoSum(input, 2020)!;

console.log('Part One:', p1NumOne * p1NumTwo);

const [p2NumOne, p2NumTwo, p2NumThree] = threeSum(input, 2020)!;

console.log('Part Two:', p2NumOne * p2NumTwo * p2NumThree);