export interface DataSet {
  data: string;
  label: string;
}

export default class NaiveBayes {
  private model: Record<string, Record<string, number>> = {};
  private priors: Record<string, number> = {};

  constructor(public readonly sample: DataSet[]) {}

  train(labels: string[]) {
    const sums = this.findSums();
    const priors = this.findPriors(sums);

    this.priors = priors;
    this.model = this.findPosteriors(labels);
  }

  findPosteriors(labels: string[]) {
    const model: Record<string, Record<string, number>> = {};

    for (let i = 0; i < this.sample.length; i++) {
      const el = this.sample[i];
      const words = this.tokenize(el.data);

      for (let j = 0; j < words.length; j++) {
        const word = words[j];

        if (!model[word]) {
          model[word] = this.initModel(labels);
        }

        model[word][el.label] = (model[word][el.label] || 0) + 1;
      }
    }
    return model;
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
      t[label] = 0;
    }
    return t;
  }

  tokenize(text: string) {
    return text.split(" ");
  }
}
