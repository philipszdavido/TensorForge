// K = number of neighbors

import assert from "../assert/assert";

// 1. Store all training samples
// 2. For a new sample:
//    a. Calculate distance to every point
//    b. Sort by distance
//    c. Pick K nearest neighbors
//    d. Majority vote
// 3. Return prediction

export default class KNN {
  constructor(public readonly samples: number[][]) {}

  euclidean_distance(x1: number[], x2: number[]) {
    // Implementation for calculating distance between two points
    assert(x1.length === x2.length, "Vectors must be of the same length");
    let sum = 0;
    for (let i = 0; i < x1.length; i++) {
      sum += (x1[i] - x2[i]) ** 2;
    }
    return Math.sqrt(sum);
  }

  predict(data: number[]) {
    for (const sample of this.samples) {
      // calculate distance to every point
      this.euclidean_distance(sample, data);
      // sort by distance
      // pick K nearest neighbors
      // majority vote
    }
  }
}
