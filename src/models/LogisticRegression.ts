import assert from "../assert/assert";
import { Vector } from "../core/Vector";
import error from "../error/error";
import sigmoid from "../math/sigmoid";
import dot from "../math/vector/dot";
import Model from "./Model";

// features = [[1,3], [4,2]]
// label    = [ 0,    1]
// SGD
// Mini-batch SGD
// Adam
// RMSProp

export default class LogisticRegression extends Model {
  constructor(
    public readonly features: number[][],
    public readonly labels: number[],
    protected epochs: number = 1000,
    protected bias: number = -1,
    protected learningRate: number = 0.2,
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
    return sigmoid(x);
  }

  predict(x: number[]) {
    return this.activate(this.calc(x, this.weights, this.bias));
  }

  train() {
    for (let i = 0; i < this.epochs; i++) {
      this.features.forEach((feat, i) => {
        const z = this.calc(feat, this.weights, this.bias);

        const predicted = this.activate(z);
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
    const errorValue = error(predicted, this.labels[i]);
    this.gradBias = errorValue;

    this.gradWeights = features.map(
      (feature) => errorValue * feature,
    );
  }
}
