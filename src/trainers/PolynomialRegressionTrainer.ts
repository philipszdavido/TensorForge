import { Loss } from "../loss";
import Optimizer from "../optimizers/Optimizer";
import Trainer from "./Trainer";
import PolynomialRegression from "../models/PolyNomialRegression";

export default class PolynomialRegressionTrainer extends Trainer {

    private _x: number[][] = [];

    train(model: PolynomialRegression, optimizer: Optimizer, lossFn: Loss): void {
        this._x = model.transform(this.x);
        const weights = model.initializeWeights(this._x[0].length)
        model.setWeights(weights);

        let totalLoss = 0;

        for (let i = 0; i < this.epochs; i++) {

            for (let j = 0; j < this._x.length; j++) {

                // Forward pass
                const yHat = model.forward(this._x[j]);

                model.backward(this._x[j], this.y[j], yHat);

                const loss = lossFn(this.y[j] ,yHat);

                totalLoss += loss;

                optimizer.step();

            }

        }

    }

}
