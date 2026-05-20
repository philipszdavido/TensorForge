import KNN from "./KNN";

export default class WeightedKNN extends KNN {
  majorityVote(data: { distance: number; label: string }[]): string {
    const votes: Record<string, number> = {};

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const weight = 1 / (element.distance + 1e-5);

      if (!votes[element.label]) {
        votes[element.label] = weight;
        continue;
      }

      votes[element.label] = +votes[element.label] + weight;
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
