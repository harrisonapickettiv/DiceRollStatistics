import { roll } from './diceRoller';

const getRawData = (rollExpr, trials) => {
  const rawData = [];
  for (let i = 0; i < trials; i++) {
    rawData.push(roll(rollExpr).total);
  }
  return rawData;
};

const tabulateData = (rawData) => {
  const rollData = {};
  for (
    let rollTotal = Math.min(...rawData);
    rollTotal <= Math.max(...rawData);
    rollTotal++
  ) {
    rollData[rollTotal] = 0;
  }
  for (const rollTotal of rawData) {
    rollData[rollTotal] += 1;
  }
  return rollData;
};

const calcPercent = (tabData, trials) => {
  const rollData = {};
  for (const label of Object.keys(tabData)) {
    rollData[label] = tabData[label] / trials;
  }
  return rollData;
};

const updateLabels = (labels, rollData) => {
  const chartLabels = new Set(labels);
  for (const label of Object.keys(rollData)) {
    chartLabels.add(label);
  }
  return [...chartLabels].sort((a, b) => a - b);
};

const getChartData = (labels, rollData) => {
  const data = [];
  for (const label of labels) {
    data.push(rollData[label] || 0);
  }
  return data;
};

const updateDatasets = (datasets, labels) => {
  const newDatasets = [];
  for (const ds of datasets) {
    ds.data = getChartData(labels, ds.rollData);
    newDatasets.push(ds);
  }
  return newDatasets;
};

const removeDataset = (chartData, id) => {
  chartData.datasets = chartData.datasets.filter((d) => d.datasetID !== id);
  return chartData;
};

const updateChartData = (rollExpr, trials, color, chartData, datasetID) => {
  const rawData = getRawData(rollExpr, trials);
  const tabData = tabulateData(rawData);
  const rollData = calcPercent(tabData, trials);

  chartData.labels = updateLabels(chartData.labels, rollData);
  chartData.datasets.push({
    label: rollExpr,
    data: [],
    backgroundColor: color,
    borderColor: '#000000',
    borderWidth: 1,
    rollData,
    datasetID,
  });
  chartData.datasets = updateDatasets(chartData.datasets, chartData.labels);

  return chartData;
};

export {
  updateChartData,
  removeDataset,
  getRawData,
  tabulateData,
  calcPercent,
  updateLabels,
  getChartData,
  updateDatasets,
};
