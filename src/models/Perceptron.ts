import assert from "../assert/assert";
import sigmoid from "../math/sigmoid";
import LogisticRegression from "./LogisticRegression";

export default class DiscretePerceptron extends LogisticRegression {
  constructor(
    public readonly features: number[][],
    public readonly labels: number[],
    protected epochs: number = 1000,
    protected bias: number = -1,
    protected learningRate: number = 0.2,
  ) {
    super(features, labels, epochs, bias, learningRate);
  }
  
  step(prob: number) {
    assert(typeof prob == "number");
    return prob >= 0.5 ? 1 : 0;
  }

  protected activate(x: number): number {
    assert(typeof x == "number");
    return this.step(sigmoid(x));
  }
}
