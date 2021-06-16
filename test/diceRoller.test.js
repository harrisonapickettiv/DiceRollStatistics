import { randInt, roll } from '../src/diceRoller';

const testCount = 1000;

describe('Tests with randInt', () => {
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
});

describe('Tests with roll("d4") or roll("1d4")', () => {
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
});

describe('Tests with roll("2d4")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('2d4'));
    }
  });

  test('roll("2d4") returns an object where the property "total" is a number between 2 and 8', () => {
    diceRolls.forEach((roll) => {
      expect(roll.total).toBeGreaterThanOrEqual(2);
      expect(roll.total).toBeLessThanOrEqual(8);
    });
  });

  test('roll("2d4") returns an object where "total" is equal to the sum of "results"', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0)).toBe(total);
    });
  });
});

describe('Tests with roll("5d6+10")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6+10'));
    }
  });

  test('roll("5d6+10") returns an object where the property "total" is a number between 15 and 40', () => {
    diceRolls.forEach((roll) => {
      expect(roll.total).toBeGreaterThanOrEqual(15);
      expect(roll.total).toBeLessThanOrEqual(40);
    });
  });

  test('roll("5d6+10") returns an object where "total" is equal to the sum of "results" plus 10', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0) + 10).toBe(total);
    });
  });
});

describe('Tests with roll("5d6-10")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6-10'));
    }
  });

  test('roll("5d6-10") returns an object where the property "total" is a number between -5 and 20', () => {
    diceRolls.forEach((roll) => {
      expect(roll.total).toBeGreaterThanOrEqual(-5);
      expect(roll.total).toBeLessThanOrEqual(20);
    });
  });

  test('roll("5d6-10") returns an object where "total" is equal to the sum of "results" minus 10', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0) - 10).toBe(total);
    });
  });
});

describe('Tests with roll("4d8*13")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('4d8*13'));
    }
  });

  test('roll("4d8*13") returns an object where the property "total" is a number between 52 and 416', () => {
    diceRolls.forEach((roll) => {
      expect(roll.total).toBeGreaterThanOrEqual(52);
      expect(roll.total).toBeLessThanOrEqual(416);
    });
  });

  test('roll("4d8*13") returns an object where "total" evenly divisible by 13', () => {
    diceRolls.forEach(({ total }) => {
      expect(total % 13).toBe(0);
    });
  });

  test('roll("4d8*13") returns an object where "total" is equal to the sum of "results" times 13', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0) * 13).toBe(total);
    });
  });
});

describe('Tests with roll("4d6h3")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('4d6h3'));
    }
  });

  test('roll("4d6h3") returns an object where the property "total" is a number between 3 and 18', () => {
    diceRolls.forEach((roll) => {
      expect(roll.total).toBeGreaterThanOrEqual(3);
      expect(roll.total).toBeLessThanOrEqual(18);
    });
  });

  test('roll("4d6h3") returns an object where the property "results" has a length of 4', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(4);
    });
  });

  test('roll("4d6h3") returns an object where the property "total" is equal to the sum of the highest 3 elements of "results"', () => {
    diceRolls.forEach(({ total, results }) => {
      const highest = results
        .sort((a, b) => b - a)
        .slice(0, results.length - 1);
      expect(highest.reduce((acc, i) => acc + i, 0)).toBe(total);
    });
  });
});

describe('Tests with roll("5d6l3")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6l3'));
    }
  });

  test('roll("5d6l3") returns an object where the property "total" is a number between 3 and 18', () => {
    diceRolls.forEach((roll) => {
      expect(roll.total).toBeGreaterThanOrEqual(3);
      expect(roll.total).toBeLessThanOrEqual(18);
    });
  });

  test('roll("5d6l3") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6l3") returns an object where the property "total" is equal to the sum of the lowest 3 elements of "results"', () => {
    diceRolls.forEach(({ total, results }) => {
      const lowest = results
        .sort((a, b) => b - a)
        .slice(results.length - 3, results.length);
      expect(lowest.reduce((acc, i) => acc + i, 0)).toBe(total);
    });
  });
});

describe('Tests with roll("4d6h3+10")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('4d6h3+10'));
    }
  });

  test('roll("4d6h3+10") returns an object where the property "total" is a number between 13 and 28', () => {
    diceRolls.forEach((roll) => {
      expect(roll.total).toBeGreaterThanOrEqual(13);
      expect(roll.total).toBeLessThanOrEqual(28);
    });
  });

  test('roll("4d6h3+10") returns an object where the property "results" has a length of 4', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(4);
    });
  });

  test('roll("4d6h3+10") returns an object where the property "total" is equal to the sum of the highest 3 elements of "results"', () => {
    diceRolls.forEach(({ total, results }) => {
      const highest = results
        .sort((a, b) => b - a)
        .slice(0, results.length - 1);
      expect(highest.reduce((acc, i) => acc + i, 0) + 10).toBe(total);
    });
  });
});

describe('Tests with roll("4d6h3-10")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('4d6h3-10'));
    }
  });

  test('roll("4d6h3-10") returns an object where the property "total" is a number between -7 and 8', () => {
    diceRolls.forEach((roll) => {
      expect(roll.total).toBeGreaterThanOrEqual(-7);
      expect(roll.total).toBeLessThanOrEqual(8);
    });
  });

  test('roll("4d6h3-10") returns an object where the property "results" has a length of 4', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(4);
    });
  });

  test('roll("4d6h3-10") returns an object where the property "total" is equal to the sum of the highest 3 elements of "results"', () => {
    diceRolls.forEach(({ total, results }) => {
      const highest = results
        .sort((a, b) => b - a)
        .slice(0, results.length - 1);
      expect(highest.reduce((acc, i) => acc + i, 0) - 10).toBe(total);
    });
  });
});

describe('Tests with roll("5d6d3")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6d3'));
    }
  });

  test('roll("5d6d3") returns an object where the property "total" is a number between 0 and 5', () => {
    diceRolls.forEach((roll) => {
      expect(roll.total).toBeGreaterThanOrEqual(0);
      expect(roll.total).toBeLessThanOrEqual(5);
    });
  });

  test('roll("5d6d3") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6d3") returns an object where the property "total" is equal to the number of results greater than or equal to 3', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.filter((r) => r >= 3).length).toBe(total);
    });
  });
});
