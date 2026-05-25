import Model from "../Model";
import {Vector} from "../../core/Vector";
import dot from "../../math/vector/dot";

// | value | meaning               |
// | ----- | --------------------- |
// | > 1   | outside margin (safe) |
// | = 1   | on margin             |
// | 0–1   | inside margin         |
// | < 0   | wrong side            |

export default class LinearSVM extends Model {

    // regularization strength
    private readonly C: number = 1.0;

    forward(x: number[]): number {
        return dot(Vector.from(x), Vector.from(this.weights)) + this.bias;
    }

    backward(x: number[], y: number, yHat: number): void {

        const margin = y * yHat;

        if (margin >= 1) {

            for (let i = 0; i < this.weights.length; i++) {

                // here, we min the weight to widen the margin
                this.gradWeights[i] += 2 * this.weights[i];

            }

        } else {

            // here, we expand the boundaries +1 and -1 because
            // the margin fell within/beyond/below the boundaries
            for (let i = 0; i < this.weights.length; i++) {

                this.gradWeights[i] += 2 * this.weights[i] - this.C * y * x[i];

            }

            this.gradBias += -this.C * y;

        }
    }

    setBias(bias: number): void {
        this.bias = bias;
    }

    setWeights(weights: number[]): void {
        this.weights = weights;
    }

}
