import Trainer from "./Trainer";

export default class LinearSVM extends Trainer {

    train() {

        for (let i = 0; i < this.epochs; i++) {

            this.features.forEach((feat, i) => {
                const z = this.calc(feat, this.weights, this.bias);

                const margin = this.calcMargin(this.labels[i], z);

                if (margin >= 1) {
                    // w = w - lr * (2 * w)
                    this.setWeights(
                        this.weights.map(
                            (weight, i) => weight - this.learningRate * (2 * weight),
                        ),
                    );
                } else {
                    //  w = w - lr * (2 * w - C * y_i * x_i);
                    //  b = b + lr * C * y_i;
                    this.setWeights(
                        this.weights.map(
                            (weight, i) =>
                                weight -
                                this.learningRate *
                                (2 * weight - this.C * this.labels[i] * feat[i]),
                        ),
                    );
                    this.setBias(this.bias + this.learningRate * this.C * this.labels[i]);
                }
            });
        }
    }

}
