import Regularizer from "./Regularizer";

export default class Ridge extends Regularizer {

    constructor(private lambda: number) {
        super();
    }

    gradient(data: number[]): number[] {
        return this.normalizeFeatures(data);
    }

    private normalizeFeatures(data: number[]) {
        return [];
    }
}
