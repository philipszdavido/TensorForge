import { Vector } from "../core/Vector";

export interface DataSet {
  data: string;
  label: string;
}

export class NaiveBayes {
  private TotalOfAllWordsInLabel: Record<string, number> = {};
  private TotalOfAWordPerLabel: Record<string, Record<string, number>> = {};
  private TotalCountOfLabels: Record<string, number> = {};

  train(samples: DataSet[], labels: string[]) {
    for (let i = 0; i < samples.length; i++) {
      const sample = samples[i];
      const label = sample.label;

      if (!this.TotalOfAllWordsInLabel[label]) {
        this.TotalOfAllWordsInLabel[label] = 0;
      }

      if (!this.TotalCountOfLabels[label]) {
        this.TotalCountOfLabels[label] = 0;
      }
      this.TotalCountOfLabels[label]++;

      const words = sample.data.split(" ");

      for (let j = 0; j < words.length; j++) {
        const word = words[j];

        if (!this.TotalOfAWordPerLabel[word]) {
          this.TotalOfAWordPerLabel[word] = {};
          for (const label of labels) {
            this.TotalOfAWordPerLabel[word][label] = 0;
          }
        }

        this.TotalOfAWordPerLabel[word][label] += 1;

        this.TotalOfAllWordsInLabel[label] += 1;
      }
    }
  }

  predict(_text: string, labels: string[]) {
    const text = _text.split(" ");
    console.log("TotalOfAllWordsInLabel: ", this.TotalOfAllWordsInLabel);
    console.log("TotalOfAWordPerLabel: ", this.TotalOfAWordPerLabel);
    console.log("TotalCountOfLabels: ", this.TotalCountOfLabels);

    const scores: Record<string, Array<number>> = {};
    for (const label of labels) {
      scores[label] = [];
    }

    for (const word of text) {
      // calc prob of this word for all labels

      for (const label of labels) {
        // prob of this word in class label
        console.log(word, label);
        const wordProbInLabel =
          (this.TotalOfAWordPerLabel?.[word]?.[label] || 0) /
          this.TotalOfAllWordsInLabel[label];

        console.log(wordProbInLabel);

        let TotalOfWordsNotInThisLabel = 0;
        let TotalOfAWordPerNotInThisLabel = 0;

        for (const _label of labels) {
          if (_label == label) continue;
          TotalOfWordsNotInThisLabel += this.TotalOfAllWordsInLabel[_label];
          TotalOfAWordPerNotInThisLabel +=
            this.TotalOfAWordPerLabel?.[word]?.[_label] || 0;
        }

        console.log(TotalOfWordsNotInThisLabel, TotalOfAWordPerNotInThisLabel);

        const otherP =
          TotalOfAWordPerNotInThisLabel / TotalOfWordsNotInThisLabel;

        scores[label].push(wordProbInLabel / (wordProbInLabel + otherP) || 0);
      }
    }
    

    console.log(scores);
  }
}
