import { updateChartData, removeDataset } from './histogram';
import { diceRegexp } from './diceRoller';

const { Chart, cuid, randomColor } = window;
Chart.defaults.color = '#000000';
Chart.defaults.borderColor = '#000000';

const chartData = document.getElementById('chartData');
const ctx = document.getElementById('diceRollChart').getContext('2d');
const diceChart = new Chart(ctx, {
  type: 'bar',
  data: {},
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const selectColor = () => {
  const colorForm = document.getElementById('color');
  const color = colorForm.value === '#000001' ? randomColor() : colorForm.value;
  colorForm.value = '#000001';
  return color;
};

const createDataRemoveBtn = (datasetID, color, rollExpr) => {
  const div = document.createElement('div');
  const a = document.createElement('a');
  div.setAttribute('id', datasetID);
  div.setAttribute('class', 'col p-1 m-1 rounded');
  div.setAttribute('style', `background-color: ${color};`);
  a.setAttribute('class', 'btn btn-sm');
  a.innerHTML = `&times;&nbsp;${rollExpr}`;
  a.onclick = (event) => {
    event.target.parentNode.remove();
    diceChart.data = removeDataset(diceChart.data, event.target.parentNode.id);
    diceChart.update();
  };
  div.append(a);
  chartData.append(div);
};

const pruneOldData = (data, maxDatasets) => {
  if (data.datasets.length <= maxDatasets) return data;

  let newData;
  while (data.datasets.length > maxDatasets) {
    const id = data.datasets[0].datasetID;
    document.getElementById(id).remove();
    newData = removeDataset(data, id);
  }
  return newData;
};

const exprTest = (rollExpr) => {
  const splitExpr = rollExpr.split(' ');
  let test = true;
  for (const exp of splitExpr) {
    test = test && diceRegexp.test(exp);
  }
  return test;
};

const validateInput = (input) => {
  let validInput = true;

  if (!Number.isInteger(input.trials) || input.trials < 1) {
    document.getElementById('trialsError').removeAttribute('hidden');
    validInput = false;
  } else {
    document.getElementById('trialsError').setAttribute('hidden', true);
  }

  if (!Number.isInteger(input.maxDatasets) || input.maxDatasets < 1) {
    document.getElementById('maxDatasetsError').removeAttribute('hidden');
    validInput = false;
  } else {
    document.getElementById('maxDatasetsError').setAttribute('hidden', true);
  }

  if (!exprTest(input.rollExpr)) {
    document.getElementById('diceRegexpError').removeAttribute('hidden');
    validInput = false;
  } else {
    document.getElementById('diceRegexpError').setAttribute('hidden', true);
  }

  return validInput;
};

const updateChart = (e) => {
  e.preventDefault();

  const trials = document.getElementById('trials').valueAsNumber;
  const rollExpr = document.getElementById('rollExpression').value;
  const maxDatasets = document.getElementById('maxDatasets').valueAsNumber;
  const datasetID = cuid();
  const color = selectColor();

  if (!validateInput({ trials, rollExpr, maxDatasets })) return;

  createDataRemoveBtn(datasetID, color, rollExpr);
  diceChart.data = updateChartData(
    rollExpr,
    trials,
    color,
    diceChart.data,
    datasetID
  );
  diceChart.data = pruneOldData(diceChart.data, maxDatasets);
  diceChart.update();
};

const resetChart = () => {
  chartData.innerHTML = null;
  diceChart.data = {};
  diceChart.update();
};

export { updateChart, resetChart };
