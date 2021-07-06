import { updateChartData } from './histogram';

const { Chart, randomColor } = window;
Chart.defaults.color = '#000000';
Chart.defaults.borderColor = '#000000';

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

const updateChart = () => {
  const trials = parseInt(document.getElementById('trials').value);
  const rollExpr = document.getElementById('rollExpression').value || '4d6h3';

  diceChart.data = updateChartData(
    rollExpr,
    trials,
    selectColor(),
    diceChart.data
  );
  diceChart.update();
};

export { updateChart };
