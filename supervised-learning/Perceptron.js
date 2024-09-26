class Perceptron {
  weights = [];
  learningRate = 0.0001;

  constructor(numOfWeights) {
    for (let i = 0; i < numOfWeights; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  // Activation function
  sign(num) {
    return num >= 0 ? 1 : -1;
  }

  getGuess(inputs) {
    let sum = 0;
    inputs.forEach((input, i) => (sum += input * this.weights[i]));

    return this.sign(sum);
  }

  getGuessY(x) {
    const [w0, w1, w2] = [this.weights[0], this.weights[1], this.weights[2]];
    return -(w2 / w1) - (w0 / w1) * x;
  }

  getCurrentSlope() {
    return this.weights;
  }

  train(inputs, answer) {
    const guess = this.getGuess(inputs);
    const error = answer - guess;

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningRate;
    }
  }

  scrambleWeights() {
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
  }
}
