const basicDiceRegexp = '([+-])?(\\d+)?d(\\d+|F)';
const keepRegexp = '(?:h(\\d+)|l(\\d+))?';
const modifierRegexp = '(?:(\\+?-?\\d+)|(?:(\\*?)(\\d+)))?';
const difficultyRegexp = '(?:d(\\d+)|m(\\d+))?';
const targetRegexp = '(?:t(\\d+)|n(\\d+))?';
const diceRegexp = new RegExp(
  `^${basicDiceRegexp}${keepRegexp}${difficultyRegexp}${modifierRegexp}${targetRegexp}$`
);

const sum = (list) => list.reduce((acc, i) => acc + i, 0);
const sort = (list) => list.sort((a, b) => b - a);
const sumHighest = (results, highest) => sum(sort(results).slice(0, highest));
const sumLowest = (results, lowest) =>
  sum(sort(results).slice(results.length - lowest, results.length));

const randInt = (
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const rollDice = (dice = 1, sides) => {
  const results = [];
  for (let i = 0; i < dice; i++) {
    results.push(randInt(1, sides));
  }
  return results;
};

const fateDice = (dice = 1) => {
  const results = [];
  for (let i = 0; i < dice; i++) {
    results.push(randInt(-1, 1));
  }
  return results;
};

const roll = (exp) => {
  const [
    ,
    prefix,
    dice,
    sides,
    keepHighest,
    keepLowest,
    difficulty,
    limit,
    modifier,
    multiply,
    multiple,
    target,
    negate,
  ] = exp.match(diceRegexp);

  const results = sides === 'F' ? fateDice(dice) : rollDice(dice, sides);

  let total;
  if (keepHighest) {
    total = sumHighest(results, keepHighest);
  } else if (keepLowest) {
    total = sumLowest(results, keepLowest);
  } else if (difficulty) {
    total = results.filter((r) => r >= difficulty).length;
  } else if (limit) {
    total = results.filter((r) => r <= limit).length;
  } else {
    total = sum(results);
  }

  if (prefix === '-') {
    total *= -1;
  }
  if (multiply) {
    total *= multiple;
  }
  if (modifier) {
    total += parseInt(modifier);
  }

  let success;
  if (target) {
    success = total >= parseInt(target);
  }
  if (negate) {
    success = total <= parseInt(negate);
  }

  return target || negate ? { results, total, success } : { results, total };
};

export { randInt, roll, diceRegexp };
