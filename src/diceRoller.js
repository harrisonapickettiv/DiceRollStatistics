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
const difficultyRegexp = '(?:d(\\d+))?';
const diceRegexp = new RegExp(
  `^${basicDiceRegexp}${keepRegexp}${difficultyRegexp}${modifierRegexp}$`
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
    modifier,
    multiply,
    multiple,
  ] = exp.match(diceRegexp);

  const results = rollDice(dice, sides);

  let total;
  if (keepHighest) {
    total = sumHighest(results, keepHighest);
  } else if (keepLowest) {
    total = sumLowest(results, keepLowest);
  } else if (difficulty) {
    total = results.filter((r) => r >= difficulty).length;
  } else {
    total = sum(results);
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
