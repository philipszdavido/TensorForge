import assert from "../assert/assert";
import { Vector } from "../core/Vector";
import error from "../error/error";
import random from "../math/random";
import dot from "../math/vector/dot";

export class LinearRegression {
  private weights: number[];
  constructor(
    public readonly features: number[][],
    public readonly labels: number[],
    private epochs: number = 1000,
    private bias: number = -1,
    private learningRate: number = 0.2,
  ) {
    this.weights = new Array(features[0].length);

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random() + i;
    }
  }

  private adjustWeights(error: number, features: number[]) {
    this.setWeights(
      this.weights.map(
        (weight, i) => weight + this.learningRate * error * features[i],
      ),
    );
  }

  private adjustBias(error: number) {
    const bias = this.bias + this.learningRate * error;
    this.setBias(bias);
  }

  protected calc(x: number[], weights: number[], bias: number) {
    const result = dot(Vector.from(x), Vector.from(weights));
    return result + bias;
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
    return (x);
  }

  predict(x: number[]) {
    return this.activate(this.calc(x, this.weights, this.bias));
  }

  train() {
    for (let i = 0; i < this.epochs; i++) {
      this.features.forEach((feat, i) => {
        const y_bar = this.calc(feat, this.weights, this.bias);

        const predicted = this.activate(y_bar);
        const _error = error(predicted, this.labels[i]);

        this.adjustWeights(_error, feat);

        this.adjustBias(_error);
      });
    }
  }
}
