import { LinearRegression } from "./LinearRegression";

// y = wx**n + b
export default class PolynomialRegression extends LinearRegression {
  private lambda = 0.001;
  constructor(
    public readonly degree: number,
    public features: number[][],
    public readonly labels: number[],
    protected epochs: number = 1000,
    protected bias: number = -1,
    protected learningRate: number = 0.2,
  ) {
    super(features, labels, epochs, bias, learningRate);

    this.initializeWeights(this.features[0].length);
  }

  protected adjustWeights(error: number, features: number[]) {
    this.setWeights(
      this.weights.map(
        (weight, i) =>
          weight -
          this.learningRate * error * features[i] +
          this.lambda * weight,
      ),
    );
  }

  expandPolynomialFeatures_(degree: number) {
    this.features = this.features.map((samples) => {
      const arr: number[] = [];

      samples.forEach((feature) => {
        for (let i = 1; i <= degree; i++) {
          arr.push(Math.pow(feature, i));
        }
      });

      return arr;
    });

    this.weights = Array(this.features[0].length).fill(0.01);

    console.log(this.features);
  }

  expandPolynomialFeatures(degree: number) {
    this.features = this.features.map((sample) => {
      const result: number[] = [];

      const generate = (arr: number[], start: number, depth: number) => {
        if (depth > degree) return;

        for (let i = start; i < sample.length; i++) {
          const val =
            arr.length === 0 ? sample[i] : arr[arr.length - 1] * sample[i];
          result.push(val);
          generate([...arr, sample[i]], i, depth + 1);
        }
      };

      // this is bias-like constant, its optional
      result.push(1);

      generate([], 0, 1);

      return result;
    });

    this.weights = Array(this.features[0].length).fill(0.01);
  }

  transform(sample: number[]) {
    const degree = 2;

    const result: number[] = [];
    result.push(1);

    const generate = (arr: number[], start: number, depth: number) => {
      if (depth > degree) return;

      for (let i = start; i < sample.length; i++) {
        const val =
          arr.length === 0 ? sample[i] : arr[arr.length - 1] * sample[i];

        result.push(val);
        generate([...arr, sample[i]], i, depth + 1);
      }
    };

    generate([], 0, 1);

    return result;
  }

  predict(x: number[]) {
    const transformed = this.transform(x);
    console.log(this.weights, this.bias)
    return this.activate(this.calc(transformed, this.weights, this.bias));
  }
}
