import { randInt, roll } from '../src/diceRoller';

const testCount = 1000;

test('randInt generates an integer', () => {
  const randomNumbers = [];
  for (let i = 0; i < testCount; i++) {
    randomNumbers.push(randInt());
  }
  const t = randomNumbers.filter((i) => Number.isInteger(i));

  expect(t).toHaveLength(testCount);
});

test('randInt generates a number in a specified range', () => {
  const randomNumbers = [];
  for (let i = 0; i < testCount; i++) {
    randomNumbers.push(randInt(1, 4));
  }
  randomNumbers.forEach((i) => {
    expect(i).toBeGreaterThanOrEqual(1);
    expect(i).toBeLessThanOrEqual(4);
  });
});

test('roll("d4") returns an object where the property "total" is a number between 1 and 4', () => {
  const diceRolls = [];
  for (let i = 0; i < testCount; i++) {
    diceRolls.push(roll('d4'));
  }
  diceRolls.forEach((roll) => {
    expect(roll.total).toBeGreaterThanOrEqual(1);
    expect(roll.total).toBeLessThanOrEqual(4);
  });
});

test('roll("1d4") returns an object where the property "total" is a number between 1 and 4', () => {
  const diceRolls = [];
  for (let i = 0; i < testCount; i++) {
    diceRolls.push(roll('1d4'));
  }
  diceRolls.forEach((roll) => {
    expect(roll.total).toBeGreaterThanOrEqual(1);
    expect(roll.total).toBeLessThanOrEqual(4);
  });
});
