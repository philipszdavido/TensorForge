import assert from "../assert/assert";

export default abstract class Model {
  protected weights: number[];

  protected gradBias!: number;
  protected gradWeights!: number[];

  constructor(
    public readonly features: number[][],
    public readonly labels: number[],
    protected epochs: number = 1000,
    protected bias: number = -1,
    protected learningRate: number = 0.2,
  ) {
    assert(features.length === 0, "Features cannot be empty");
    assert(
      features.length !== labels.length,
      "Features and labels size mismatch",
    );

    this.weights = new Array(features[0].length);

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = (Math.random() - 0.5) * 0.01;
    }
  }

  abstract forward(x: number[]): number;

  abstract backward(i: number, predicted: number, features: number[]): void;
  abstract setBias(bias: number): void;
  abstract setWeights(weights: number[]): void;

  getWeights() {
    return this.weights;
  }

  getGradWeights() {
    return this.gradWeights
  }

  getGradBias() {
    return this.gradBias;
  }

}
