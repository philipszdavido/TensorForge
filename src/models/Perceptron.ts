import assert from "../assert/assert";
import sigmoid from "../math/sigmoid";
import LogisticRegression from "./LogisticRegression";

export default class DiscretePerceptron extends LogisticRegression {
  constructor(
    protected bias: number = -1,
  ) {
    super(bias);
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
