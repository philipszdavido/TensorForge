import Trainer from "./Trainer";
import Model from "../models/Model";
import Optimizer from "../optimizers/Optimizer";
import {Loss} from "../loss";

export default class PerceptronTrainer extends Trainer {

    train(model: Model, optimizer?: Optimizer, lossFn?: Loss): void {

        let epochs = 1000;

        for (let epoch = 0; epoch < epochs; epoch++) {

            for (let i = 0; i < this.x.length; i++) {

                // Forward pass
                const yHat = model.forward(this.x[i]);

                model.backward(this.x[i], this.y[i], yHat);

            }
        }

    }

}
