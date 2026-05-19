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
    assert(features.length > 0, "Features cannot be empty");

    assert(
      features.length === labels.length,
      "Features and labels size mismatch",
    );

    this.weights = this.initializeWeights(features[0].length); //new Array(features[0].length);

  }

  initializeWeights(size: number): number[] {
    const limit = Math.sqrt(1 / size);

    return Array.from({ length: size }, () => (Math.random() * 2 - 1) * limit);
  }

  abstract forward(x: number[]): number;

  abstract backward(i: number, predicted: number, features: number[]): void;
  abstract setBias(bias: number): void;
  abstract setWeights(weights: number[]): void;

  getWeights() {
    return this.weights;
  }

  getGradWeights() {
    return this.gradWeights;
  }

  getGradBias() {
    return this.gradBias;
  }
}
