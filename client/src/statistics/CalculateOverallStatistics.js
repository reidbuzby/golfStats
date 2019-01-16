
class CalculateOverallStatistics {

  constructor(rounds) {
    this.rounds = rounds;
  }

  calculate() {

  }

  calculateFIRPercentage() {
    let firs = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      firs = firs + round.firs;
    }
    return (firs/this.rounds.length);
  }

  calculateScore() {
    let score = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      score = score + round.score;
    }
    return (score/this.rounds.length);
  }

  calculateToPar() {
    let toPar = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      toPar = toPar + round.toPar;
    }
    return (firs/this.rounds.length);
  }

  calculateGIRPercentage() {
    let girs = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      girs = girs + round.girs;
    }
    return (girs/this.rounds.length);
  }

  calculateNumberOfPutts() {
    let putts = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const putts = this.rounds[i];
      putts = putts + round.putts;
    }
    return (firs/this.rounds.length);
  }

  calculateUpAndDownPercentage() {
    let upAndDown = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      upAndDown = upAndDown + round.upAndDown;
    }
    return (upAndDown/this.rounds.length);
  }

  calculateSGPPro() {
    let sgpPro = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      sgpPro = sgpPro + round.sgpPro;
    }
    return (sgpPro/this.rounds.length);
  }

  calculateSGPScratch() {
    let sgpScratch = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      sgpScratch = sgpScratch + round.sgpScratch;
    }
    return (sgpScratch/this.rounds.length);
  }

  calculateShortsided() {
    let shortsided = 0;
    for (let i=0;i<this.rounds.length;i++) {
      const round = this.rounds[i];
      shortsided = shortsided + round.shortsided;
    }
    return (shortsided/this.rounds.length);
  }
}
