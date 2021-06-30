import { updateChartData } from './histogram';

const { Chart } = window;
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

const updateChart = () => {
  const trials = parseInt(document.getElementById('trials').value);
  const rollExpr = document.getElementById('rollExpression').value || '4d6h3';

  diceChart.data = updateChartData(rollExpr, trials, diceChart.data);
  diceChart.update();
};

export { updateChart };
