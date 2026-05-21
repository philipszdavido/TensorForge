import Regularizer from "./Regularizer";

export default class Lasso extends Regularizer {

    constructor(private lambda: number) {
        super();
    }

    gradient(data: number[]): number[] {
        return this.normalizeFeatures(data);
    }

    // normalizeFeatures(data: number[]) {
    //   const numFeatures = this.features[0].length;
    //   const numSamples = this.features.length;
    //
    //   for (let j = 0; j < numFeatures; j++) {
    //     let sum = 0;
    //     for (let i = 0; i < numSamples; i++) {
    //       sum += this.features[i][j];
    //     }
    //     const mean = sum / numSamples;
    //
    //     let varianceSum = 0;
    //     for (let i = 0; i < numSamples; i++) {
    //       varianceSum += Math.pow(this.features[i][j] - mean, 2);
    //     }
    //     const stdDev = Math.sqrt(varianceSum / numSamples);
    //
    //     for (let i = 0; i < numSamples; i++) {
    //       this.features[i][j] =
    //         stdDev === 0 ? 0 : (this.features[i][j] - mean) / stdDev;
    //     }
    //   }
    // }

    private normalizeFeatures(data: number[]) {
        return data.map(
            datum => this.lambda * Math.sign(datum)
        );
    }
}
