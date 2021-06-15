const randInt = (
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const diceRegexp = /^(\d+)?d(\d+)(?:(\+?-?\d+)|(?:(\*?)(\d+)))?(?:h(\d+))?$/;

const roll = (exp) => {
  const [, dice, sides, modifier, multiply, multiple, highest] =
    exp.match(diceRegexp);
  const results = [];

  for (let i = 0; i < (dice || 1); i++) {
    results.push(randInt(1, sides));
  }

  let total;
  if (highest) {
    total = results
      .sort((a, b) => b - a)
      .slice(0, highest)
      .reduce((acc, i) => acc + i, 0);
  } else {
    total = results.reduce((acc, i) => acc + i, 0);
  }
  if (modifier) {
    total += parseInt(modifier);
  }
  if (multiply) {
    total *= multiple;
  }

  return { results, total };
};

export { randInt, roll };
