# LASSO

Similar to Ridge BUT different penalty.

Formula:

Loss=MSE+λ∑∣wi∣

Key Difference

Lasso pushes MANY weights exactly to zero.

// ===============================
// optimizers/SGD.ts
// ===============================

import Optimizer from "./Optimizer";

export default class SGD extends Optimizer {

    step(): void {

        let regGrads: number[] =
            new Array(this.model.weights.length).fill(0);

        // regularization gradients
        if (this.regularizer) {
            regGrads =
                this.regularizer.gradient(
                    this.model.weights
                );
        }

        // update weights
        for (let i = 0; i < this.model.weights.length; i++) {

            const totalGrad =
                this.model.weightGrads[i] +
                regGrads[i];

            this.model.weights[i] -=
                this.lr * totalGrad;
        }

        // bias NOT regularized
        this.model.bias -=
            this.lr * this.model.biasGrad;
    }
}

// ===============================
// trainers/Trainer.ts
// ===============================

import LogisticRegression from "../models/LogisticRegression";
import Loss from "../losses/Loss";
import Optimizer from "../optimizers/Optimizer";

export default class Trainer {

    train(
        model: LogisticRegression,
        X: number[][],
        y: number[],
        lossFn: Loss,
        optimizer: Optimizer,
        epochs: number
    ) {

        for (let epoch = 0; epoch < epochs; epoch++) {

            let totalLoss = 0;

            for (let i = 0; i < X.length; i++) {

                // ======================
                // FORWARD PASS
                // ======================

                const yHat =
                    model.forward(X[i]);

                // ======================
                // LOSS
                // ======================

                const loss =
                    lossFn.forward(
                        y[i],
                        yHat
                    );

                totalLoss += loss;

                // ======================
                // BACKWARD PASS
                // ======================

                model.backward(
                    X[i],
                    y[i],
                    yHat
                );

                // ======================
                // OPTIMIZER STEP
                // ======================

                optimizer.step();
            }

            console.log(
                `Epoch ${epoch} | Loss ${
                    totalLoss / X.length
                }`
            );
        }
    }
}

// ===============================
// main.ts
// ===============================

import LogisticRegression from "./models/LogisticRegression";

import BCELoss from "./losses/BCELoss";

import SGD from "./optimizers/SGD";

import Trainer from "./trainers/Trainer";

import Ridge from "./regularizers/Ridge";

// ===============================
// DATASET
// ===============================

const X = [
[1, 3],
[3, 1],
];

const y = [0, 1];

// ===============================
// MODEL
// ===============================

const model =
new LogisticRegression(2);

// ===============================
// LOSS
// ===============================

const loss =
new BCELoss();

// ===============================
// REGULARIZATION
// ===============================

const ridge =
new Ridge(0.01);

// ===============================
// OPTIMIZER
// ===============================

const optimizer =
new SGD(
model,
0.1,
ridge
);

// ===============================
// TRAINER
// ===============================

const trainer =
new Trainer();

// ===============================
// TRAIN
// ===============================

trainer.train(
model,
X,
y,
loss,
optimizer,
1000
);

// ===============================
// PREDICTIONS
// ===============================

console.log(
model.predict([4, 1])
);

console.log(
model.predict([1, 4])
);
