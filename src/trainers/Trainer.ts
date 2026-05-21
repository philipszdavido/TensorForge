import Model from "../models/Model";
import assert from "../assert/assert";
import Optimizer from "../optimizers/Optimizer";
import {Loss} from "../loss";

export default abstract class Trainer {
    constructor(
        public readonly x: number[][], // features
        public readonly y: number[], // labels
        protected epochs: number = 1000,
    ) {
        assert(x.length > 0, "Features cannot be empty");

        assert(
            x.length === y.length,
            "Features and labels size mismatch",
        );

    }

    abstract train(
        model: Model,
        optimizer: Optimizer,
        lossFn: Loss
    ): void;
}
