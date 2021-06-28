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
  diceChart.data.labels = [1, 2, 3, 4, 5, 6];
  diceChart.data.datasets = [
    {
      label: 'Example Data',
      data: [1, 2, 3, 4, 5, 6],
      backgroundColor: '#00ff00',
      borderColor: '#000000',
      borderWidth: 1,
    },
  ];

  diceChart.update();
};

export { updateChart };
