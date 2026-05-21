import { LinearRegression } from "./LinearRegression";

// y = wx**n + b
export default class PolynomialRegression extends LinearRegression {

    constructor(
        private readonly degree = 2,
        protected readonly inputSize: number,
    ) {
        super(inputSize);
    }

    getDegree() {
        return this.degree;
    }

    predict(x: number[]) {
        const _x = this.transform([x])
        return this.forward(_x[0])
    }

    transform(x: number[][]): number[][] {

        return x.map((_x) => {

            const expanded: number[] = [];

            for (let j = 0; j < _x.length; j++) {

                for (let i = 1; i <= this.getDegree(); i++) {
                    expanded.push(_x[j] * i);
                }

            }

            return expanded

        });

    }


}
