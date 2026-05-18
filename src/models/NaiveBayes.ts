export interface DataSet {
  data: string;
  label: string;
}

export default class NaiveBayes {
  private readonly model = {};

  constructor(public readonly sample: DataSet[]) {}

  train(labels: string[]) {
    const sums = this.findSums();
    const priors = this.findPriors(sums);
  }

  findPosteriors(labels: string[]) {
    const model: Record<string, Record<string, number>> = {};

    for (let i = 0; i < this.sample.length; i++) {
      const el = this.sample[i];
      const words = el.data.split(" ");

      for (let j = 0; j < words.length; j++) {
        const word = words[j];

        if (!model[word]) {
          model[word] = this.initModel(labels);
        }

        model[word][el.label] = (model[word][el.label] || 0) + 1;

      }
    }
  }

  findPriors(sums: Record<string, number>) {
    const priors: Record<string, number> = {};

    for (const key in sums) {
      if (!Object.hasOwn(sums, key)) continue;

      const sum = sums[key];
      priors[key] = sum / this.sample.length;
    }

    return priors;
  }

  findSums() {
    const sums: Record<string, number> = {};

    for (let index = 0; index < this.sample.length; index++) {
      const label = this.sample[index].label;
      sums[label] = (sums[label] || 0) + 1;
    }

    return sums;
  }

  initModel(labels: string[]) {
    const t: Record<string, number> = {};
    for (let index = 0; index < labels.length; index++) {
      const label = labels[index];
      t[label] = 1;
    }
    return t;
  }
}
