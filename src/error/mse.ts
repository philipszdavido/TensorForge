// Mean Square Error
import assert from "../assert/assert";

export default function meanSquareError(x: number[], y: number[]) {

    assert(x.length == y.length);

    let sum = 0
    for (let i = 0; i < x.length; i++) {
        const result = (x[i] - y[i]) ** 2
        sum += result
    }

    return sum / x.length;
}
