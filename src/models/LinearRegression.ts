import assert from "../assert/assert";
import { Vector } from "../core/Vector";
import error from "../error/error";
import dot from "../math/vector/dot";
import Model from "./Model";

export class LinearRegression extends Model {
  constructor(
    public readonly features: number[][],
    public readonly labels: number[],
    protected epochs: number = 10,
    protected bias: number = -1,
    protected learningRate: number = 0.0001,
  ) {
    super(features, labels, epochs, bias, learningRate);
  }

  private adjustWeights(error: number, features: number[]) {
    this.setWeights(
      this.weights.map(
        (weight, i) => weight - this.learningRate * error * features[i],
      ),
    );
  }

  private adjustBias(error: number) {
    const bias = this.bias - this.learningRate * error;
    this.setBias(bias);
  }

  protected calc(x: number[], weights: number[], bias: number) {
    return dot(Vector.from(x), Vector.from(weights)) + bias;
  }

  setLearningRate(l: number) {
    assert(typeof l == "number");
    this.learningRate = l;
  }

  setEpochs(e: number) {
    assert(typeof e == "number");
    this.epochs = e;
  }

  setBias(bias: number) {
    this.bias = bias;
  }

  setWeights(weights: number[]) {
    this.weights = weights;
  }

  protected activate(x: number) {
    return x;
  }

  predict(x: number[]) {
    return this.activate(this.calc(x, this.weights, this.bias));
  }

  normalizeFeatures() {
    const numFeatures = this.features[0].length;
    const numSamples = this.features.length;

    for (let j = 0; j < numFeatures; j++) {
      let sum = 0;
      for (let i = 0; i < numSamples; i++) {
        sum += this.features[i][j];
      }
      const mean = sum / numSamples;

      let varianceSum = 0;
      for (let i = 0; i < numSamples; i++) {
        varianceSum += Math.pow(this.features[i][j] - mean, 2);
      }
      const stdDev = Math.sqrt(varianceSum / numSamples);

      for (let i = 0; i < numSamples; i++) {
        this.features[i][j] =
          stdDev === 0 ? 0 : (this.features[i][j] - mean) / stdDev;
      }
    }
  }

  train() {
    for (let i = 0; i < this.epochs; i++) {
      this.features.forEach((feat, i) => {
        const y = this.calc(feat, this.weights, this.bias);

        const predicted = this.activate(y);
        const errorValue = error(predicted, this.labels[i]);

        this.adjustWeights(errorValue, feat);

        this.adjustBias(errorValue);
      });
    }
  }

  forward(x: number[]) {
    return this.activate(this.calc(x, this.weights, this.bias));
  }

  backward(i: number, predicted: number, features: number[]): void {
    const errorValue = error(this.labels[i], predicted);
    this.gradBias = this.bias + this.learningRate * errorValue;

    this.gradWeights = this.weights.map(
      (weight, i) => weight + this.learningRate * errorValue * features[i],
    );
  }
}
