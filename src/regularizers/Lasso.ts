import Regularizer from "./Regularizer";

export default class Lasso extends Regularizer {

    constructor(private lambda: number) {
        super();
    }

    gradient(data: number[]): number[] {
        return this.normalizeFeatures(data);
    }

    private normalizeFeatures(data: number[]) {
        return data.map(
            datum => this.lambda * Math.sign(datum)
        );
    }
}
