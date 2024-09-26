class TargetSeparator {
  constructor() {
    this.slope = random(0.2, 0.8);
    this.intercept = random(0.3, 0.7);
  }

  getTargetY(x) {
    return this.slope * x + this.intercept;
  }

  setTargetSlope(slope) {
    this.slope = slope;
  }

  setTargetIntercept(intercept) {
    this.intercept = intercept;
  }
}

class Point {
  bias = 1;

  constructor(x, y, targetSeparator) {
    this.x = x === undefined ? random(-1, 1) : x;
    this.y = y === undefined ? random(-1, 1) : y;
    this.targetSeparator = targetSeparator;

    const lineY = this.targetSeparator.getTargetY(this.x);
    this.answer = this.y > lineY ? 1 : -1;
  }

  updateAnswer() {
    const lineY = this.targetSeparator.getTargetY(this.x);
    this.answer = this.y > lineY ? 1 : -1;
  }

  show(guess) {
    fill(guess >= 0 ? "green" : "red");
    circle(this.pixelX(), this.pixelY(), 10);
  }

  pixelX() {
    return map(this.x, -1, 1, 0, width);
  }

  pixelY() {
    return map(this.y, -1, 1, height, 0);
  }
}

class TrainingData {
  points = [];

  constructor(targetSeparator) {
    for (let i = 0; i < 200; i++) {
      this.points[i] = new Point(undefined, undefined, targetSeparator);
    }
  }
}
