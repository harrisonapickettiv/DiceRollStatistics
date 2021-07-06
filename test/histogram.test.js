import {
  updateChartData,
  getRawData,
  tabulateData,
  calcPercent,
  updateLabels,
  getChartData,
  updateDatasets,
} from '../src/js/histogram';

const exampleData = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Example Data',
      data: [1, 2, 3, 4, 5, 6],
      backgroundColor: '#00ff00',
      borderColor: '#000000',
      borderWidth: 1,
      rollData: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 },
    },
  ],
};

const getExampleData = () =>
  JSON.parse(
    JSON.stringify(exampleData) // deep copy of exampleData
  );

describe('getRawData', () => {
  let rawData;
  beforeAll(() => {
    rawData = getRawData('1d12', 1000);
  });

  test('getRawData("1d12", 1000) returns an array', () => {
    expect(Array.isArray(rawData)).toBeTruthy();
  });

  test('getRawData("1d12", 1000) returns an array of length 1000', () => {
    expect(rawData.length).toBe(1000);
  });

  test('getRawData("1d12", 1000) returns an array of integers', () => {
    for (const item of rawData) {
      expect(Number.isInteger(item)).toBeTruthy();
    }
  });
});

describe('tabulateData', () => {
  let rawData;
  let tabData;

  beforeAll(() => {
    rawData = getRawData('1d12', 1000);
    tabData = tabulateData(rawData);
  });

  test('tabulateData returns an object', () => {
    expect(typeof tabData).toBe('object');
    expect(tabData).not.toBeNull();
  });

  test("tabulateData returns an object with keys that correspond the input's value range", () => {
    const range = [];
    for (let i = Math.min(...rawData); i <= Math.max(...rawData); i++) {
      range.push(i.toString());
    }
    expect(Object.keys(tabData).sort((a, b) => a - b)).toEqual(range);
  });

  test('tabulateData returns an object with values that represent the frequency of occurrence of each value of the input', () => {
    const tab = {};
    for (let i = Math.min(...rawData); i <= Math.max(...rawData); i++) {
      tab[i] = 0;
    }
    for (const i of rawData) {
      tab[i] += 1;
    }
    expect(tabData).toMatchObject(tab);
  });
});

describe('calcPercent', () => {
  const trials = 1000;
  let tabData;
  let asPercent;
  beforeAll(() => {
    tabData = tabulateData(getRawData('1d12', trials));
    asPercent = calcPercent(tabData, trials);
  });

  test('calcPercent returns an object', () => {
    expect(typeof asPercent).toBe('object');
    expect(asPercent).not.toBeNull();
  });

  test('calcPercent returns an object with values that represent the percentage of occurrence of each value of the input', () => {
    const percent = {};
    for (const i of Object.keys(tabData)) {
      percent[i] = tabData[i] / trials;
    }
    expect(asPercent).toMatchObject(percent);
  });
});

describe('updateLabels', () => {
  const labels = ['2', '4', '6', '8', '10'];
  const chartData = { 1: 0, 3: 0, 5: 0, 7: 0, 9: 0 };
  let updLabels;
  beforeAll(() => {
    updLabels = updateLabels(labels, chartData);
  });

  test('updateLabels returns an array', () => {
    expect(Array.isArray(updLabels)).toBeTruthy();
  });

  test('updateLabels returns an array that sorted in ascending order', () => {
    expect(
      updLabels.every((v, i, a) => !i || parseInt(a[i - 1]) <= parseInt(v))
    ).toBeTruthy();
  });

  test("updateLabels returns an array that contains a set of all label items found in it's inputs", () => {
    const labelsSet = new Set(labels);
    for (const label of Object.keys(chartData)) {
      labelsSet.add(label);
    }
    const merged = [...labelsSet];
    expect(updLabels.length).toBe(merged.length);
    expect(updLabels).toEqual(expect.arrayContaining(merged));
  });
});

describe('getChartData', () => {
  const labels = ['1', '2', '3', '4', '5'];
  const data = { 1: 15, 2: 30, 3: 10, 4: 40, 5: 8 };
  let chartData;
  beforeAll(() => {
    chartData = getChartData(labels, data);
  });

  test('getChartData returns an array', () => {
    expect(Array.isArray(chartData)).toBeTruthy();
  });

  test('getChartData returns an array with length equal to the length of labels', () => {
    expect(chartData.length).toBe(labels.length);
  });

  test('getChartData returns an array of values sorted by key in labels', () => {
    const chart = [];
    for (const i of labels) {
      chart.push(data[i]);
    }
    expect(chartData).toEqual(chart);
  });
});

describe('updateDatasets', () => {
  const d = getExampleData();
  d.labels = ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6'];
  d.datasets.push({
    label: 'New Data',
    data: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    backgroundColor: '#ff0000',
    borderColor: '#000000',
    borderWidth: 1,
    rollData: {
      '-4': -4,
      '-3': -3,
      '-2': -2,
      '-1': -1,
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    },
  });
  let newDatasets;
  beforeAll(() => {
    newDatasets = updateDatasets(d.datasets, d.labels);
  });

  test('updateDatasets returns a list of datasets', () => {
    expect(Array.isArray(newDatasets)).toBeTruthy();
    for (const dataset of newDatasets) {
      expect(typeof dataset).toBe('object');
      expect(dataset).not.toBeNull();

      expect(dataset).toHaveProperty('label');
      expect(typeof dataset.label).toBe('string');

      expect(dataset).toHaveProperty('data');
      expect(Array.isArray(dataset.data)).toBeTruthy();

      expect(dataset).toHaveProperty('backgroundColor');
      expect(typeof dataset.backgroundColor).toBe('string');

      expect(dataset).toHaveProperty('borderColor');
      expect(typeof dataset.borderColor).toBe('string');

      expect(dataset).toHaveProperty('borderWidth');
      expect(typeof dataset.borderWidth).toBe('number');

      expect(dataset).toHaveProperty('rollData');
      expect(typeof dataset.rollData).toBe('object');
      expect(dataset).not.toBeNull();
    }
  });

  test('updateDatasets returns a list of datasets each containing an array called data with length equal to labels.length', () => {
    for (const dataset of newDatasets) {
      expect(dataset.data.length).toBe(d.labels.length);
    }
  });

  test('updateDatasets returns a list of datasets each containing an array called data with values sorted by key in labels', () => {
    for (const dataset of newDatasets) {
      for (let i = 0; i < d.labels; i++) {
        const test = dataset.rollData[d.labels[i]] || 0;
        expect(dataset.data[i]).toBe(test);
      }
    }
  });
});

describe('updateChartData', () => {
  let chartData;
  beforeAll(() => {
    chartData = updateChartData('1d12', 10000, '#000001', getExampleData());
  });

  test('updateChartData returns a chartJS data object', () => {
    expect(chartData).toHaveProperty('labels');
    expect(Array.isArray(chartData.labels)).toBeTruthy();

    expect(chartData).toHaveProperty('datasets');
    expect(Array.isArray(chartData.datasets)).toBeTruthy();

    for (const data of chartData.datasets) {
      expect(typeof data).toBe('object');
      expect(data).not.toBeNull();

      expect(data).toHaveProperty('label');
      expect(typeof data.label).toBe('string');

      expect(data).toHaveProperty('data');
      expect(Array.isArray(data.data)).toBeTruthy();

      expect(data).toHaveProperty('backgroundColor');
      expect(typeof data.backgroundColor).toBe('string');

      expect(data).toHaveProperty('borderColor');
      expect(typeof data.borderColor).toBe('string');

      expect(data).toHaveProperty('borderWidth');
      expect(typeof data.borderWidth).toBe('number');

      expect(data).toHaveProperty('rollData');
      expect(typeof data.rollData).toBe('object');
      expect(data).not.toBeNull();
    }
  });

  test('updateChartData returns a chartJS data object with one additional dataset', () => {
    expect(exampleData.datasets.length + 1).toBe(chartData.datasets.length);
  });

  test('updateChartData returns a chartJS data object with labels applicable to the new dataset', () => {
    expect(chartData.labels).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ]);
  });
});
