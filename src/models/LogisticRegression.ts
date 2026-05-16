export default class LogisticExpression {
  sigmoid(x: number) {
    // y = 1 / (1 + e^-x)
    return 1 / (1 + Math.exp(-x));
  }

  step(prob: number) {
    return prob >= 0.5 ? 1 : 0;
  }

  calcError(predicted: number, actual: number) {
    return actual - predicted;
  }

  predict(w1: number, x1: number, w2: number, x2: number, bias: number) {
    // z = w1 * width + w2 * length + bias
    // pred = step(z)

    // ay + bx + c = 0
    // y = -(b/a)x + -(c/a)

    return w1 * x1 + w2 * x2 + bias;
  }

  train(features: number[]) {
    let bias = -1;
    // we want to predict if bug is ladybird

    // width contributes more to a bug being a ladybird
    let widthWeight = 0.9;

    // length contributes less
    let lengthWeight = 0.1;
    let learningRate = 0.2;

    const epochs = 100;

    for (let i = 0; i < epochs; i++) {
      features.forEach((feat, i) => {
        const y_bar = this.predict(
          widthWeight,
          feat.width,
          lengthWeight,
          feat.length,
          bias,
        );
        const predicted = this.sigmoid(y_bar);
        const error = this.calcError(predicted, feat.actual);

        widthWeight += learningRate * error * feat.width;
        lengthWeight += learningRate * error * feat.length;
        bias += learningRate * error;

        console.log(feat, y_bar, predicted, error, widthWeight, lengthWeight);
      });
      console.log("====================");
    }
  }
}
