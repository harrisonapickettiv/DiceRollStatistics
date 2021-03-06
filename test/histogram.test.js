import {
  updateChartData,
  getRawData,
  tabulateData,
  calcPercent,
  updateLabels,
  getChartData,
  updateDatasets,
  removeDataset,
} from '../src/js/histogram';

const testDatasetObjects = (datasets) => {
  expect(Array.isArray(datasets)).toBeTruthy();

  for (const data of datasets) {
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

    expect(data).toHaveProperty('datasetID');
    expect(typeof data.datasetID).toBe('string');
  }
};

const testChartJSObject = (chartData) => {
  expect(chartData).toHaveProperty('labels');
  expect(Array.isArray(chartData.labels)).toBeTruthy();

  expect(chartData).toHaveProperty('datasets');
  testDatasetObjects(chartData.datasets);
};

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
      datasetID: 'ckqtna1n60000316bkdlo',
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
  let testData = { labels: [], datasets: [] };
  testData = updateChartData('2d12', 100, '#000001', testData, `test2d12`);
  testData = updateChartData('3d6', 100, '#000001', testData, `test3d6`);
  testData = updateChartData('4d6h3', 100, '#000001', testData, `test4d6h3`);
  testData = updateChartData('4d6l3', 100, '#000001', testData, `test4d6l3`);

  let updLabels;
  beforeAll(() => {
    testData.datasets.push({
      label: '4dF',
      data: [
        0.0126, 0.0444, 0.1216, 0.1964, 0.238, 0.2016, 0.1217, 0.0497, 0.014,
      ],
      backgroundColor: '#ed5ced',
      borderColor: '#000000',
      borderWidth: 1,
      rollData: {
        0: 0.238,
        1: 0.2016,
        2: 0.1217,
        3: 0.0497,
        4: 0.014,
        '-4': 0.0126,
        '-3': 0.0444,
        '-2': 0.1216,
        '-1': 0.1964,
      },
      datasetID: 'ckqtrj4520000316b7tg7',
    });
    updLabels = updateLabels(testData.datasets);
  });

  test('updateLabels returns an array', () => {
    expect(Array.isArray(updLabels)).toBeTruthy();
  });

  test('updateLabels returns an array that sorted in ascending order', () => {
    expect(
      updLabels.every((v, i, a) => !i || parseInt(a[i - 1]) <= parseInt(v))
    ).toBeTruthy();
  });

  test('updateLabels returns an array that contains a set of all label items in datasets', () => {
    const testLabels = new Set();
    for (const dataset of testData.datasets) {
      for (const label of Object.keys(dataset.rollData)) {
        testLabels.add(label);
      }
    }
    const t = [...testLabels];
    expect(updLabels.length).toBe(t.length);
    expect(updLabels).toEqual(expect.arrayContaining(t));
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
    datasetID: 'ckqtna21c0002316bcx48',
  });
  let newDatasets;
  beforeAll(() => {
    newDatasets = updateDatasets(d.datasets, d.labels);
  });

  test('updateDatasets returns a list of datasets', () => {
    testDatasetObjects(newDatasets);
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

describe('removeDataset', () => {
  let testData = { labels: [], datasets: [] };
  let chartData;
  beforeAll(() => {
    for (let i = 0; i < 10; i++) {
      testData = updateChartData(
        '1d12',
        100,
        '#000001',
        testData,
        `testdata${i}`
      );
    }
    chartData = removeDataset(
      JSON.parse(JSON.stringify(testData)),
      'testdata5'
    );
  });

  test('removeDataset returns a chartJS data object', () => {
    testChartJSObject(chartData);
  });

  test('removeDataset returns a chartJS data object with one fewer dataset', () => {
    expect(chartData.datasets.length).toBe(testData.datasets.length - 1);
  });

  test('removeDataset returns a chartJS data object with the specified dataset removed', () => {
    expect(
      testData.datasets.filter((d) => d.datasetID === 'testdata5').length
    ).toBe(1);
    expect(
      chartData.datasets.filter((d) => d.datasetID === 'testdata5').length
    ).toBe(0);
  });
});

describe('updateChartData', () => {
  let chartData;
  beforeAll(() => {
    chartData = updateChartData(
      '1d12',
      10000,
      '#000001',
      getExampleData(),
      'ckqtna1so0001316b21rh'
    );
  });

  test('updateChartData returns a chartJS data object', () => {
    testChartJSObject(chartData);
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
