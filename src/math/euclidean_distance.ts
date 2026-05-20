import assert from "../assert/assert";

export default function euclidean_distance(x1: number[], x2: number[]) {
    // Implementation for calculating distance between two points
    assert(x1.length === x2.length, "Vectors must be of the same length");
    let sum = 0;
    for (let i = 0; i < x1.length; i++) {
        sum += (x1[i] - x2[i]) ** 2;
    }
    return Math.sqrt(sum);
}
