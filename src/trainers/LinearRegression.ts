import Trainer from "./Trainer";
import assert from "../assert/assert";
import Model from "../models/Model";
import Regularizer from "../regularizers/Regularizer";
import Optimizer from "../optimizers/Optimizer";
import {Loss} from "../error";

export default class LinearRegressionTrainer extends Trainer {

    setEpochs(e: number) {
        assert(typeof e == "number");
        this.epochs = e;
    }

    train(
        model: Model,
        optimizer: Optimizer,
        lossFn: Loss,
        regularizer: Regularizer
    ) {

        let totalLoss = 0;

        for (let i = 0; i < this.epochs; i++) {

            for (let j = 0; j < this.x.length; j++) {

                // Forward pass
                const yHat = model.forward(this.x[i]);

                model.backward(this.x[i], this.y[i], yHat);

                const loss = lossFn(this.y[i] ,yHat);

                totalLoss += loss;

                optimizer.step();

            }

        }
    }
}
