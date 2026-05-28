import {Matrix} from "../core/Matrix";
import {Vector} from "../core/Vector";

type Layer = {};

export default class NeuralNetwork {

    layers: Matrix[] = []

    constructor(public readonly inputSize: number, public readonly hidden: number[], public readonly outputSize: number) {

        let currentInputs = inputSize;

        for (let i = 0; i < hidden.length; i++) {

            const layer = hidden[i]
            // outputs x inputs
            this.layers.push(new Matrix(currentInputs, layer));
            currentInputs = layer;
        }

        this.layers.push(new Matrix(currentInputs, outputSize));

    }

    forward(input: number[]) {

        let acc: Vector = Vector.from(input);

        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            acc = Matrix.matrixMulVector(layer, acc);
        }

        return acc

    }
}

