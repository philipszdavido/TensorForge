// K = number of neighbors

import assert from "../../assert/assert";
import euclidean_distance from "../../math/euclidean_distance";

// 1. Store all training samples
// 2. For a new sample:
//    a. Calculate distance to every point
//    b. Sort by distance
//    c. Pick K nearest neighbors
//    d. Majority vote
// 3. Return prediction

export interface DataLabel {
  data: number[];
  label: string;
}

export default class KNN {

  private means: number[] = [];
  private stds: number[] = [];

  private normalizedSamples: DataLabel[] = [];

  constructor(
    public readonly samples: DataLabel[],
    public readonly k?: number,
  ) {

    assert(samples.length > 0, "Samples cannot be empty");

    if (!k) {
      this.k = Math.sqrt(samples.length);
    }

    this.computeNormalizationStats();

    this.normalizedSamples = samples.map(sample => ({
      label: sample.label,
      data: this.normalizeVector(sample.data),
    }));

  }

  predict(data: number[]) {
    const distances = [];
    let kNearestNeighbors = [];
    let pred;

    for (const sample of this.normalizedSamples) {
      // calculate distance to every point
      const distance = euclidean_distance(sample.data, data);
      distances.push({ distance, label: sample.label });
    }

    // sort by distance
    // TODO: improve sorting
    distances.sort((a, b) => a.distance - b.distance);

    // pick K nearest neighbors
    kNearestNeighbors = distances.slice(0, this.k);

    // majority vote
    pred = this.majorityVote(kNearestNeighbors);

    return pred;
  }

  majorityVote(data: { distance: number; label: string }[]): string {
    const votes: Record<string, number> = {};

    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      if (!votes[element.label]) {
        votes[element.label] = 1;
        continue;
      }

      votes[element.label] = +votes[element.label] + 1;
    }

    let highestVotes = 0;
    let keyWithHighestVotes = "";
    for (const key in votes) {
      const numVotes = votes[key];

      if (highestVotes < numVotes) {
        highestVotes = numVotes;
        keyWithHighestVotes = key;
      }
    }
    return keyWithHighestVotes;
  }

  private computeNormalizationStats() {
    const dimensions = this.samples[0].data.length;

    for (let col = 0; col < dimensions; col++) {
      const values = this.samples.map(s => s.data[col]);

      const mean =
          values.reduce((a, b) => a + b, 0) / values.length;

      const variance =
          values.reduce((sum, value) => {
            return sum + (value - mean) ** 2;
          }, 0) / values.length;

      const std = Math.sqrt(variance);

      this.means.push(mean);

      this.stds.push(std === 0 ? 1 : std);
    }
  }

  private normalizeVector(vector: number[]): number[] {
    return vector.map((value, i) => {
      return (value - this.means[i]) / this.stds[i];
    });
  }

}
