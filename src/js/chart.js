import { updateChartData, removeDataset } from './histogram';

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
  div.setAttribute('class', 'col p-1 m-1 rounded-left rounded-right');
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

const updateChart = () => {
  const trials = parseInt(document.getElementById('trials').value);
  const rollExpr = document.getElementById('rollExpression').value || '4d6h3';
  const datasetID = cuid();
  const color = selectColor();

  createDataRemoveBtn(datasetID, color, rollExpr);
  diceChart.data = updateChartData(
    rollExpr,
    trials,
    color,
    diceChart.data,
    datasetID
  );
  diceChart.update();
};

const resetChart = () => {
  chartData.innerHTML = null;
  diceChart.data = {};
  diceChart.update();
};

export { updateChart, resetChart };
