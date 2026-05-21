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
    return sigmoid(x);
  }

  predict(x: number[]) {
    return this.activate(this.calc(x, this.weights, this.bias));
  }

  forward(x: number[]) {
    return this.activate(this.calc(x, this.weights, this.bias));
  }

  backward(
      x: number[],
      y: number,
      yHat: number
  ) {

    const errorValue = error(yHat, y);

    for (let i = 0; i < this.weights.length; i++) {

      this.gradWeights[i] = errorValue * x[i];

    }

    this.gradBias = errorValue;

  }

}
