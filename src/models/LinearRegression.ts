import { Predictor } from "./Predictor";

export class LinearRegression {
  private readonly epochs = 1000;

  fit(X: Array<number>, Y: Array<number>) {}

  train() {

    let weightNum = 0.01;

    const { height, weight } = _test;

    let heightPredicted = this.predict(weight, weightNum);

    let error = this.calcError(height, heightPredicted);

    console.log(
      "Height Predicted:",
      heightPredicted,
      "error:",
      error,
      "Actual Height:",
      height,
    );

    while (error > 0) {
      weightNum = this.adjustWeight(error, weightNum);

      heightPredicted = this.predict(weight, weightNum);

      error = this.calcError(height, heightPredicted);

      console.log(
        "Height Predicted:",
        heightPredicted,
        "error:",
        error,
        "Actual Height:",
        height,
      );
    }

    console.log("Weight: ", weightNum);
  }

  calcError(actual: number, predicted: number) {
    return actual - predicted;
  }

  adjustWeight(error: number, weight: number) {
    if (error === 0) {
      return weight;
    }

    weight = weight + 0.01;

    return weight;
  }

  predict(x: number, m: number) {
    return m * x;
  }
}
