import assert from "../assert/assert";
import Model from "./Model";
import dot from "../math/vector/dot";
import {Vector} from "../core/Vector";
import error from "../error/error";

export default class DiscretePerceptron extends Model {

  constructor(
      protected readonly inputSize: number,
      protected bias: number = -1,
  ) {
    super(inputSize, bias);
  }

  protected calc(x: number[], weights: number[], bias: number) {
    return dot(Vector.from(x), Vector.from(weights)) + bias;
  }

  step(logit: number) {
    assert(typeof logit == "number");
    return logit >= 0 ? 1 : 0;
  }

  forward(x: number[]): number {
    return this.step(this.calc(x, this.weights, this.bias))
  }

  backward(x: number[], y: number, yHat: number): void {

    const errorValue = error(y, yHat);

    for (let i = 0; i < this.weights.length; i++) {

      this.weights[i] += errorValue * x[i] * 0.1;

    }

    this.bias += errorValue * 0.1;

  }

  setBias(bias: number): void {
    this.bias = bias;
  }

  setWeights(weights: number[]): void {
    this.weights = weights;
  }

}
