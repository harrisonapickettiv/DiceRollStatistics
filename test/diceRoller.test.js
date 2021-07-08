import { randInt, roll } from '../src/js/diceRoller';

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

describe('Tests with roll("d4")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('d4'));
    }
  });

  test('roll("d4") returns an object where the property "results" has a length of 1', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(1);
    });
  });

  test('roll("d4") returns an object where the property "total" is a number between 1 and 4', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(1);
      expect(total).toBeLessThanOrEqual(4);
    });
  });

  test('roll("d4") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("1d4")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('1d4'));
    }
  });

  test('roll("1d4") returns an object where the property "results" has a length of 1', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(1);
    });
  });

  test('roll("1d4") returns an object where the property "total" is a number between 1 and 4', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(1);
      expect(total).toBeLessThanOrEqual(4);
    });
  });

  test('roll("1d4") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
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

  test('roll("2d4") returns an object where the property "results" has a length of 2', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(2);
    });
  });

  test('roll("2d4") returns an object where the property "total" is a number between 2 and 8', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(2);
      expect(total).toBeLessThanOrEqual(8);
    });
  });

  test('roll("2d4") returns an object where "total" is equal to the sum of "results"', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0)).toBe(total);
    });
  });

  test('roll("2d4") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
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

  test('roll("5d6+10") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6+10") returns an object where the property "total" is a number between 15 and 40', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(15);
      expect(total).toBeLessThanOrEqual(40);
    });
  });

  test('roll("5d6+10") returns an object where "total" is equal to the sum of "results" plus 10', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0) + 10).toBe(total);
    });
  });

  test('roll("5d6+10") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
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

  test('roll("5d6-10") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6-10") returns an object where the property "total" is a number between -5 and 20', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(-5);
      expect(total).toBeLessThanOrEqual(20);
    });
  });

  test('roll("5d6-10") returns an object where "total" is equal to the sum of "results" minus 10', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0) - 10).toBe(total);
    });
  });

  test('roll("5d6-10") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
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

  test('roll("4d8*13") returns an object where the property "results" has a length of 4', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(4);
    });
  });

  test('roll("4d8*13") returns an object where the property "total" is a number between 52 and 416', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(52);
      expect(total).toBeLessThanOrEqual(416);
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

  test('roll("4d8*13") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
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
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(3);
      expect(total).toBeLessThanOrEqual(18);
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

  test('roll("4d6h3") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
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
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(3);
      expect(total).toBeLessThanOrEqual(18);
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

  test('roll("5d6l3") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
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
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(13);
      expect(total).toBeLessThanOrEqual(28);
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

  test('roll("4d6h3+10") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
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
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(-7);
      expect(total).toBeLessThanOrEqual(8);
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

  test('roll("4d6h3-10") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
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
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(0);
      expect(total).toBeLessThanOrEqual(5);
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

  test('roll("5d6d3") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("5d6m3")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6m3'));
    }
  });

  test('roll("5d6m3") returns an object where the property "total" is a number between 0 and 5', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(0);
      expect(total).toBeLessThanOrEqual(5);
    });
  });

  test('roll("5d6m3") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6m3") returns an object where the property "total" is equal to the number of results less than or equal to 3', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.filter((r) => r <= 3).length).toBe(total);
    });
  });

  test('roll("5d6m3") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("5d6t20")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6t20'));
    }
  });

  test('roll("5d6t20") returns an object where the property "total" is a number between 5 and 30', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(5);
      expect(total).toBeLessThanOrEqual(30);
    });
  });

  test('roll("5d6t20") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6t20") returns an object where "total" is equal to the sum of "results"', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0)).toBe(total);
    });
  });

  test('roll("5d6t20") returns an object with the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).toHaveProperty('success');
    });
  });

  test('roll("5d6t20") returns an object where the property "success" is true when the property "total" is greater than or equal to 20 and false otherwise', () => {
    diceRolls.forEach(({ total, success }) => {
      if (total >= 20) {
        expect(success).toBeTruthy();
      } else {
        expect(success).toBeFalsy();
      }
    });
  });
});

describe('Tests with roll("5d6n20")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6n20'));
    }
  });

  test('roll("5d6n20") returns an object where the property "total" is a number between 5 and 30', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(5);
      expect(total).toBeLessThanOrEqual(30);
    });
  });

  test('roll("5d6n20") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6n20") returns an object where "total" is equal to the sum of "results"', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0)).toBe(total);
    });
  });

  test('roll("5d6n20") returns an object with the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).toHaveProperty('success');
    });
  });

  test('roll("5d6n20") returns an object where the property "success" is true when the property "total" is less than or equal to 20 and false otherwise', () => {
    diceRolls.forEach(({ total, success }) => {
      if (total <= 20) {
        expect(success).toBeTruthy();
      } else {
        expect(success).toBeFalsy();
      }
    });
  });
});

describe('Tests with roll("5d6+10t20")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6+10t20'));
    }
  });

  test('roll("5d6+10t20") returns an object where the property "total" is a number between 15 and 40', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(15);
      expect(total).toBeLessThanOrEqual(40);
    });
  });

  test('roll("5d6+10t20") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6+10t20") returns an object where "total" is equal to the sum of "results" plus 10', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0) + 10).toBe(total);
    });
  });

  test('roll("5d6+10t20") returns an object with the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).toHaveProperty('success');
    });
  });

  test('roll("5d6+10t20") returns an object where the property "success" is true when the property "total" is greater than or equal to 20 and false otherwise', () => {
    diceRolls.forEach(({ total, success }) => {
      if (total >= 20) {
        expect(success).toBeTruthy();
      } else {
        expect(success).toBeFalsy();
      }
    });
  });
});

describe('Tests with roll("5d6+10n20")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6+10n20'));
    }
  });

  test('roll("5d6+10n20") returns an object where the property "total" is a number between 15 and 40', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(15);
      expect(total).toBeLessThanOrEqual(40);
    });
  });

  test('roll("5d6+10n20") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6+10n20") returns an object where "total" is equal to the sum of "results" plus 10', () => {
    diceRolls.forEach(({ total, results }) => {
      expect(results.reduce((acc, i) => acc + i, 0) + 10).toBe(total);
    });
  });

  test('roll("5d6+10n20") returns an object with the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).toHaveProperty('success');
    });
  });

  test('roll("5d6+10n20") returns an object where the property "success" is true when the property "total" is less than or equal to 20 and false otherwise', () => {
    diceRolls.forEach(({ total, success }) => {
      if (total <= 20) {
        expect(success).toBeTruthy();
      } else {
        expect(success).toBeFalsy();
      }
    });
  });
});

describe('Tests with roll("5d6h3+10t20")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6h3+10t20'));
    }
  });

  test('roll("5d6h3+10t20") returns an object where the property "total" is a number between 13 and 28', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(13);
      expect(total).toBeLessThanOrEqual(28);
    });
  });

  test('roll("5d6h3+10t20") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6h3+10t20") returns an object where "total" is equal to the sum of the three highest "results" plus 10', () => {
    diceRolls.forEach(({ total, results }) => {
      const highest = results
        .sort((a, b) => b - a)
        .slice(0, results.length - 2);
      expect(highest.reduce((acc, i) => acc + i, 0) + 10).toBe(total);
    });
  });

  test('roll("5d6h3+10t20") returns an object with the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).toHaveProperty('success');
    });
  });

  test('roll("5d6h3+10t20") returns an object where the property "success" is true when the property "total" is greater than or equal to 20 and false otherwise', () => {
    diceRolls.forEach(({ total, success }) => {
      if (total >= 20) {
        expect(success).toBeTruthy();
      } else {
        expect(success).toBeFalsy();
      }
    });
  });
});

describe('Tests with roll("5d6l3+10t20")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('5d6l3+10t20'));
    }
  });

  test('roll("5d6l3+10t20") returns an object where the property "total" is a number between 13 and 28', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(13);
      expect(total).toBeLessThanOrEqual(28);
    });
  });

  test('roll("5d6l3+10t20") returns an object where the property "results" has a length of 5', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(5);
    });
  });

  test('roll("5d6l3+10t20") returns an object where "total" is equal to the sum of the three lowest "results" plus 10', () => {
    diceRolls.forEach(({ total, results }) => {
      const lowest = results
        .sort((a, b) => b - a)
        .slice(results.length - 3, results.length);
      expect(lowest.reduce((acc, i) => acc + i, 0) + 10).toBe(total);
    });
  });

  test('roll("5d6l3+10t20") returns an object with the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).toHaveProperty('success');
    });
  });

  test('roll("5d6l3+10t20") returns an object where the property "success" is true when the property "total" is greater than or equal to 20 and false otherwise', () => {
    diceRolls.forEach(({ total, success }) => {
      if (total >= 20) {
        expect(success).toBeTruthy();
      } else {
        expect(success).toBeFalsy();
      }
    });
  });
});

describe('Tests with roll("dF")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('dF'));
    }
  });

  test('roll("dF") returns an object where the property "results" has a length of 1', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(1);
    });
  });

  test('roll("dF") returns an object where the property "total" is a number between -1 and 1', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(-1);
      expect(total).toBeLessThanOrEqual(1);
    });
  });

  test('roll("dF") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("1dF")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('1dF'));
    }
  });

  test('roll("1dF") returns an object where the property "results" has a length of 1', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(1);
    });
  });

  test('roll("1dF") returns an object where the property "total" is a number between -1 and 1', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(-1);
      expect(total).toBeLessThanOrEqual(1);
    });
  });

  test('roll("1dF") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("4dF")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('4dF'));
    }
  });

  test('roll("4dF") returns an object where the property "results" has a length of 4', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(4);
    });
  });

  test('roll("4dF") returns an object where the property "total" is a number between -4 and 4', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(-4);
      expect(total).toBeLessThanOrEqual(4);
    });
  });

  test('roll("4dF") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("4dF+4")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('4dF+4'));
    }
  });

  test('roll("4dF+4") returns an object where the property "results" has a length of 4', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(4);
    });
  });

  test('roll("4dF+4") returns an object where the property "total" is a number between 0 and 8', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(0);
      expect(total).toBeLessThanOrEqual(8);
    });
  });

  test('roll("4dF+4") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("4dF+4t6")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('4dF+4t6'));
    }
  });

  test('roll("4dF+4t6") returns an object where the property "results" has a length of 4', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(4);
    });
  });

  test('roll("4dF+4t6") returns an object where the property "total" is a number between 0 and 8', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(0);
      expect(total).toBeLessThanOrEqual(8);
    });
  });

  test('roll("4dF+4t6") returns an object with the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).toHaveProperty('success');
    });
  });

  test('roll("4dF+4t6") returns an object where the property "success" is true when the property "total" is greater than or equal to 6 and false otherwise', () => {
    diceRolls.forEach(({ total, success }) => {
      if (total >= 6) {
        expect(success).toBeTruthy();
      } else {
        expect(success).toBeFalsy();
      }
    });
  });
});

describe('Tests with roll("+3d12")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('+3d12'));
    }
  });

  test('roll("+3d12") returns an object where the property "results" has a length of 4', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(3);
    });
  });

  test('roll("+3d12") returns an object where the property "total" is a number between 3 and 36', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(3);
      expect(total).toBeLessThanOrEqual(36);
    });
  });

  test('roll("+3d12") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("-3d12")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('-3d12'));
    }
  });

  test('roll("-3d12") returns an object where the property "results" has a length of 3', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(3);
    });
  });

  test('roll("-3d12") returns an object where the property "total" is a number between -36 and -3', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(-36);
      expect(total).toBeLessThanOrEqual(-3);
    });
  });

  test('roll("-3d12") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("-4d4+10")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('-4d4+10'));
    }
  });

  test('roll("-4d4+10") returns an object where the property "results" has a length of 4', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(4);
    });
  });

  test('roll("-4d4+10") returns an object where the property "total" is a number between -6 and 6', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(-6);
      expect(total).toBeLessThanOrEqual(6);
    });
  });

  test('roll("-4d4+10") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});

describe('Tests with roll("2d6 +3d12 -4d4+10")', () => {
  const diceRolls = [];
  beforeAll(() => {
    for (let i = 0; i < testCount; i++) {
      diceRolls.push(roll('2d6 +3d12 -4d4+10'));
    }
  });

  test('roll("2d6 +3d12 -4d4+10") returns an object where the property "results" has a length of 3', () => {
    diceRolls.forEach(({ results }) => {
      expect(results.length).toBe(3);
    });
  });

  test('roll("2d6 +3d12 -4d4+10") returns an object where the property "total" is a number between -1 and 54', () => {
    diceRolls.forEach(({ total }) => {
      expect(total).toBeGreaterThanOrEqual(-1);
      expect(total).toBeLessThanOrEqual(54);
    });
  });

  test('roll("2d6 +3d12 -4d4+10") returns an object without the property "success"', () => {
    diceRolls.forEach((diceRoll) => {
      expect(diceRoll).not.toHaveProperty('success');
    });
  });
});
