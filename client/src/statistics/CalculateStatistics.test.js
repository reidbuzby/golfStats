import CalculateStatistics from '../statistics/CalculateStatistics';

// "hole": 1,
// "teeShot": null,
// "approachShot": null,
// "upAndDown": null,
// "putts": null,
// "puttsLength": [null, null, null, null, null],
// "score": "",
// "par": null

const round = {
  data: [
    {
      putts: 1,
      teeShot: "fairway",
      puttsLength: [1, null, null, null, null],
      score: "4",
      par: 5,
      approachShot: 'green',
      upAndDown: null,
      shotsided: null
    },
    {
      putts: 1,
      teeShot: "rough",
      puttsLength: [3, null, null, null, null],
      score: "5",
      par: 5,
      approachShot: 'sand',
      upAndDown: 'yes',
      shortsided: 'yes'
    }
  ]
}

const round2 = {
  data: [
    {
      putts: 1,
      teeShot: "fairway",
      puttsLength: [1, null, null, null, null],
      score: "4",
      par: 5,
      approachShot: 'green',
      upAndDown: null,
      shotsided: null
    },
    {
      putts: 1,
      teeShot: "rough",
      puttsLength: [3, null, null, null, null],
      score: "5",
      par: 5,
      approachShot: 'sand',
      upAndDown: 'yes',
      shortsided: 'yes'
    },
    {
      putts: 1,
      teeShot: "fairway",
      puttsLength: [1, null, null, null, null],
      score: "4",
      par: 5,
      approachShot: 'green',
      upAndDown: null,
      shotsided: null
    },
  ]
}

const round3 = {
  data: [
    {
      putts: 1,
      teeShot: "fairway",
      puttsLength: [1, null, null, null, null],
      score: "4",
      par: 5,
      approachShot: 'fairway',
      upAndDown: 'yes',
      shotsided: null
    },
    {
      putts: 1,
      teeShot: "rough",
      puttsLength: [3, null, null, null, null],
      score: "5",
      par: 5,
      approachShot: 'sand',
      upAndDown: 'yes',
      shortsided: 'yes'
    },
    {
      putts: 1,
      teeShot: "fairway",
      puttsLength: [1, null, null, null, null],
      score: "4",
      par: 5,
      approachShot: 'fairway',
      upAndDown: 'no',
      shotsided: null
    },
  ]
}

describe('Strokes gained tests', () => {
  test('Scratch test', () => {
    const statsCalc = new CalculateStatistics(round);
    expect(statsCalc.calculateSGPScratch()).toBeCloseTo(0.07);
  });

  test('Pro test'), () => {
    const statsCalc = new CalculateStatistics(round);
    expect(statsCalc.calculateSGPScratch()).toBeCloseTo(0.03);
  }
});

describe('FIR percentage test', () => {
  test('FIR precentage', () => {
    const statsCalc = new CalculateStatistics(round);
    expect(statsCalc.calculateFIRPercentage()).toBeCloseTo(50.0);
  });
});

describe('Score test', () => {
  test('Score test', () => {
    const statsCalc = new CalculateStatistics(round);
    expect(statsCalc.calculateScore()).toEqual(9);
  });
});

describe('To par test', () => {
  test('To par test', () => {
    const statsCalc = new CalculateStatistics(round);
    expect(statsCalc.calculateToPar()).toEqual(-1);
  })
});

describe('GIR precentage test', () => {
  test('GIR test', () => {
    const statsCalc = new CalculateStatistics(round);
    expect(statsCalc.calculateGIRPercentage()).toBeCloseTo(50.0);
  });

  test('GIR test 2', () => {
    const statsCalc = new CalculateStatistics(round2);
    expect(statsCalc.calculateGIRPercentage()).toBeCloseTo(66.6666);
  });
});

describe('Number of putts test', () => {
  test('Number of putts test', () => {
    const statsCalc = new CalculateStatistics(round);
    expect(statsCalc.calculateNumberOfPutts()).toEqual(2);
  });
});

describe('Up and down test', () => {
  test('Up and down test', () => {
    const statsCalc = new CalculateStatistics(round3);
    expect(statsCalc.calculateUpAndDownPercentage()).toBeCloseTo(66.6666);
  });

  test('Up and down test', () => {
    const statsCalc = new CalculateStatistics(round);
    expect(statsCalc.calculateUpAndDownPercentage()).toBeCloseTo(100.0);
  });
});

describe('Shortsided test', () => {
  test('Shortsided test', () => {
    const statsCalc = new CalculateStatistics(round);
    expect(statsCalc.calculateShortsided()).toEqual(1);
  });
});
