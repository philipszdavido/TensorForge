import Trainer from "./Trainer";
import assert from "../assert/assert";
import Model from "../models/Model";
import Optimizer from "../optimizers/Optimizer";
import {Loss} from "../loss";

export default class LinearRegressionTrainer extends Trainer {

    setEpochs(e: number) {
        assert(typeof e == "number");
        this.epochs = e;
    }

    train(
        model: Model,
        optimizer: Optimizer,
        lossFn: Loss
    ) {

        let totalLoss = 0;

        for (let i = 0; i < this.epochs; i++) {

            for (let j = 0; j < this.x.length; j++) {

                // Forward pass
                const yHat = model.forward(this.x[j]);

                model.backward(this.x[j], this.y[j], yHat);

                const loss = lossFn(this.y[j] ,yHat);

                totalLoss += loss;

                optimizer.step();

            }

        }
    }
}
