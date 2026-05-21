import assert from "../assert/assert";

export default abstract class Model {
  protected weights: number[];

  protected gradBias: number;
  protected gradWeights: number[];

  protected constructor(
      protected readonly inputSize: number,
      protected bias: number = -1,
  ) {

    this.weights = this.initializeWeights(inputSize); //new Array(features[0].length);

    this.gradWeights = this.weights;
    this.gradBias = this.bias;

  }

  initializeWeights(size: number): number[] {
    const limit = Math.sqrt(1 / size);

    return Array.from({length: size}, () => (Math.random() * 2 - 1) * limit);
  }

  abstract forward(x: number[]): number;

  abstract backward(x: number[],
                    y: number,
                    yHat: number): void;

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
