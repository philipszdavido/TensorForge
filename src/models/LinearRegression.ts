import { Vector } from "../core/Vector";
import dot from "../math/vector/dot";
import Model from "./Model";
import error from "../error/error";

export class LinearRegression extends Model {

  constructor(
      protected readonly inputSize: number,
      protected bias: number = -1,
  ) {
    super(inputSize, bias);
  }

  protected calc(x: number[], weights: number[], bias: number) {
    return dot(Vector.from(x), Vector.from(weights)) + bias;
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
    return this.forward(x)
  }

  forward(x: number[]) {
    return this.activate(this.calc(x, this.weights, this.bias));
  }

  backward(x: number[],
           y: number,
           yHat: number): void {

    const errorValue = error(yHat, y);

    for (let i = 0; i < this.weights.length; i++) {

      this.gradWeights[i] = errorValue * x[i];

    }

    this.gradBias = errorValue;

  }

}
