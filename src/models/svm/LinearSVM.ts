import LogisticRegression from "../LogisticRegression";

export default class LinearSVM extends LogisticRegression {

  // regularization strength
  private readonly C: number = 1.0;

  calcMargin(y_i: number, data: number) {
    return y_i * data;
  }

}
