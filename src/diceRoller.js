const randInt = (
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const basicDiceRegexp = '(\\d+)?d(\\d+)';
const keepRegexp = '(?:h(\\d+)|l(\\d+))?';
const modifierRegexp = '(?:(\\+?-?\\d+)|(?:(\\*?)(\\d+)))?';
const difficultyRegexp = '(?:d(\\d+)|m(\\d+))?';
const targetRegexp = '(?:t(\\d+))?';
const diceRegexp = new RegExp(
  `^${basicDiceRegexp}${keepRegexp}${difficultyRegexp}${modifierRegexp}${targetRegexp}$`
);

const sum = (list) => {
  return list.reduce((acc, i) => acc + i, 0);
};

const sort = (list) => {
  return list.sort((a, b) => b - a);
};

const rollDice = (dice = 1, sides) => {
  const results = [];
  for (let i = 0; i < dice; i++) {
    results.push(randInt(1, sides));
  }
  return results;
};

const sumHighest = (results, highest) => {
  return sum(sort(results).slice(0, highest));
};

const sumLowest = (results, lowest) => {
  return sum(sort(results).slice(results.length - lowest, results.length));
};

const roll = (exp) => {
  const [
    ,
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
  ] = exp.match(diceRegexp);

  const results = rollDice(dice, sides);

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

  if (modifier) {
    total += parseInt(modifier);
  }
  if (multiply) {
    total *= multiple;
  }

  let success;
  if (target) {
    success = total >= parseInt(target);
  }

  return { results, total, success };
};

export { randInt, roll };
