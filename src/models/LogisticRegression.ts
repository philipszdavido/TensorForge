import { Vector } from "../core/Vector";
import error from "../error/error";
import sigmoid from "../math/sigmoid";
import dot from "../math/vector/dot";

export default class LogisticExpression {

  predict(x: number[], weights: number[], bias: number) {
    const result = dot(Vector.from(x), Vector.from(weights));
    return result + bias;
  }

  train(features: number[][], label: number[]) {
    let bias = -1;
    // we want to predict if bug is ladybird

    // width contributes more to a bug being a ladybird
    // length contributes less

    let learningRate = 0.2;
    let weights = new Array(features[0].length).fill(0)

    const epochs = 100;

    for (let i = 0; i < epochs; i++) {
      features.forEach((feat, i) => {

        const y_bar = this.predict(
          feat,
          weights,
          bias,
        );

        const predicted = sigmoid(y_bar);
        const _error = error(predicted, label[i]);

        weights = weights.map((weight) => learningRate * _error * weight);
        bias += learningRate * _error;
      });
    }
  }
}

// features = [[1,3], [4,2]]
// label    = [ 0,    1]
