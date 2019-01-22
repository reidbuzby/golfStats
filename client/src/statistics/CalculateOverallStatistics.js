
class CalculateOverallStatistics {

  constructor(rounds) {
    this.rounds = rounds;
  }

  calculate() {
    const overallStats = {
      "firs": this.calculateFIRPercentage(),
      "score": this.calculateScore(),
      "toPar": this.calculateToPar(),
      "girs": this.calculateGIRPercentage(),
      "putts": this.calculateNumberOfPutts(),
      "upAndDown": this.calculateUpAndDownPercentage(),
      "shortsided": this.calculateShortsided(),
      "sgpPro": this.calculateSGPPro(),
      "sgpScratch": this.calculateSGPScratch(),
      "madeShort": this.calculateMadeShortPutts(),
      "proximity": this.calculateProximity()
    };

    return overallStats;
  }

  calculateFIRPercentage() {
    let firs = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      firs = firs + round.data.firs;
    }
    return this.rnd(firs/this.rounds.length);
  }

  calculateScore() {
    let score = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      score = score + round.data.score;
    }
    return this.rnd(score/this.rounds.length);
  }

  calculateToPar() {
    let toPar = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      toPar = toPar + round.data.toPar;
    }
    return this.rnd(toPar/this.rounds.length);
  }

  calculateGIRPercentage() {
    let girs = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      girs = girs + round.data.girs;
    }
    return this.rnd(girs/this.rounds.length);
  }

  calculateNumberOfPutts() {
    let putts = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      putts = putts + round.data.putts;
    }
    return this.rnd(putts/this.rounds.length);
  }

  calculateUpAndDownPercentage() {
    let upAndDown = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      upAndDown = upAndDown + round.data.upAndDown;
    }
    return this.rnd(upAndDown/this.rounds.length);
  }

  calculateSGPPro() {
    let sgpPro = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      sgpPro = sgpPro + round.data.sgpPro;
    }
    return this.rnd(sgpPro/this.rounds.length);
  }

  calculateSGPScratch() {
    let sgpScratch = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      sgpScratch = sgpScratch + round.data.sgpScratch;
    }
    return this.rnd(sgpScratch/this.rounds.length);
  }

  calculateShortsided() {
    let shortsided = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      shortsided = shortsided + round.data.shortsided;
    }
    return this.rnd(shortsided/this.rounds.length);
  }

  calculateMadeShortPutts() {
    let shortPutts = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      shortPutts = shortPutts + round.data.madeShort;
    }
    return this.rnd(shortPutts/this.rounds.length);
  }

  calculateProximity() {
    let proximity = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      proximity = proximity + round.data.proximity;
    }
    return this.rnd(proximity/this.rounds.length);
  }

  //to round to n decimal places
  rnd(num) {
    var multiplier = Math.pow(10, 2);
    return Math.round(num * multiplier) / multiplier;
  }
}

export default CalculateOverallStatistics;
