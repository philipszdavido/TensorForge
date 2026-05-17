// K = number of neighbors

import assert from "../assert/assert";

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
  constructor(
    public readonly samples: DataLabel[],
    public readonly k?: number,
  ) {
    if (!k) {
      this.k = Math.sqrt(samples.length);
    }
  }

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
    const distances = [];
    let kNearestNeighbors = [];
    let pred;

    for (const sample of this.samples) {
      // calculate distance to every point
      const distance = this.euclidean_distance(sample.data, data);
      distances.push({ distance, label: sample.label });
    }

    // sort by distance
    distances.sort((a, b) => a.distance - b.distance);

    // pick K nearest neighbors
    kNearestNeighbors = distances.slice(0, this.k);

    // majority vote
    pred = this.majorityVote(kNearestNeighbors);

    return pred;
  }

  //   Think of it like asking neighbors
  // If you're moving into a neighborhood and ask:
  // 1 person → opinion may be unreliable
  // 5 people → better
  // 100 people → too broad, may lose local relevance
  // That’s exactly what k does in KNN.
  majorityVote(data: { distance: number; label: string }[]): string {
    const votes: Record<string, number> = {};

    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      if (!votes[element.label]) {
        votes[element.label] = 1;
        continue;
      }

      votes[element.label] = +(votes[element.label]) + 1;
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
}
