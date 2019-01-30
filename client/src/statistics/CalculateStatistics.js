
class CalculateStatistics {

  constructor(round) {
    this.round = round;
  }

  calculate() {
    let roundStats = require('../classes/BlankRoundStats.json');

    roundStats.data.firs = this.calculateFIRPercentage();
    roundStats.data.score = this.calculateScore();
    roundStats.data.toPar = this.calculateToPar();
    roundStats.data.girs = this.calculateGIRPercentage();
    roundStats.data.putts = this.calculateNumberOfPutts();
    roundStats.data.upAndDown = this.calculateUpAndDownPercentage();
    roundStats.data.shortsided = this.calculateShortsided();
    roundStats.data.sgpPro = this.calculateSGPPro();
    roundStats.data.sgpScratch = this.calculateSGPScratch();
    roundStats.data.madeShort = this.calculateMadeShortPutts();
    roundStats.data.proximity = this.calculateProximity();

    roundStats.playerID = this.round.playerID;
    roundStats.course = this.round.course;
    roundStats.teamName = this.round.teamName;
    roundStats.timestamp = this.round.timestamp;
    roundStats.weather = this.round.weather;
    roundStats.wind = this.round.wind;
    roundStats.notes = this.round.notes;

    return roundStats;
  }

  calculateFIRPercentage() {
    const data = this.round.data;

    let firs = 0;
    let totalFairways = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];

      if (hole.teeShot !== null) {
        if (hole.par != 3 && hole.teeShot === 'fairway') {
          firs++;
        }
        totalFairways++;
      }
    }

    return this.rnd((firs/totalFairways) * 100.0);
  }

  calculateScore() {
    const data = this.round.data;

    let strokes = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];
      strokes = strokes + parseInt(hole.score);
    }

    return strokes;
  }

  calculateToPar() {
    const data = this.round.data;

    let toPar = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];
      toPar = toPar + (hole.score - hole.par);
    }

    return toPar;
  }

  calculateGIRPercentage() {
    const data = this.round.data;

    let girs = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];

      if (hole.approachShot === 'green') {
        girs++;
      }
    }

    return this.rnd((girs/this.round.data.length) * 100.0);
  }

  calculateNumberOfPutts() {
    const data = this.round.data;

    let putts = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];
      putts = putts + hole.putts;
    }

    return putts;
  }

  calculateUpAndDownPercentage() {
    const data = this.round.data;

    let success = 0;
    let total = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];
      if (hole.upAndDown !== null) {
        if (hole.upAndDown === "yes") {
          success++;
        }
        total++;
      }
    }

    return this.rnd((success/total) * 100.0);
  }

  calculateSGPPro() {
    const sgp = require('../classes/StrokesGained.json');
    const data = this.round.data;

    let strokesGained = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];
      let puttsLeft = hole.putts;
      const puttsLength = hole.puttsLength;

      let j = 0;
      while(puttsLength[j] !== null) {
        const sgPutt = sgp.pro[puttsLength[j]] - puttsLeft;

        strokesGained = strokesGained + sgPutt;
        puttsLeft--;
        j++;
      }
    }

    return this.rnd(strokesGained);
  }

  calculateSGPScratch() {
    const sgp = require('../classes/StrokesGained.json');
    const data = this.round.data;

    let strokesGained = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];
      let puttsLeft = hole.putts;
      const puttsLength = hole.puttsLength;

      let j = 0;
      while(puttsLength[j] !== null) {
        const sgPutt = sgp.scratch[puttsLength[j]] - puttsLeft;

        strokesGained = strokesGained + sgPutt;
        puttsLeft--;
        j++;
      }
    }

    return this.rnd(strokesGained);
  }

  calculateShortsided() {
    const data = this.round.data;

    let shortsided = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];
      if (hole.shortsided !== null) {
        if (hole.shortsided === "yes") {
          shortsided += 1;
        }
      }
    }
    return shortsided;
  }

  calculateMadeShortPutts() {
    const data = this.round.data;

    let made = 0;
    let total = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];
      for (let j=0;j<hole.puttsLength.length;j++) {
        if (hole.puttsLength[j] !== null && hole.puttsLength[j] <= 5) {
          if (hole.puttsLength[j+1] === null) {
            made++;
            total++;
          }
          else {
            total++;
          }
        }
      }
    }

    return this.rnd((made / total) * 100.0);
  }

  calculateProximity() {
    const data = this.round.data;

    let hit = 0;
    let total = 0;
    for (let i=0;i<data.length;i++) {
      const hole = data[i];
      if (hole.approachShot === "green") {
        hit = hit + hole.puttsLength[0];
        total++;
      }
    }

    return this.rnd(hit/total);
  }

  //to round to n decimal places
  rnd(num) {
    var multiplier = Math.pow(10, 2);
    return Math.round(num * multiplier) / multiplier;
  }
}

export default CalculateStatistics;
