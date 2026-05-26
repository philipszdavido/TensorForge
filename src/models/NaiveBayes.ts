export interface DataSet {
    data: string;
    label: string;
}

export default class NaiveBayes {
    private TotalOfAllWordsInLabel: Record<string, number> = {};
    private TotalOfAWordPerLabel: Record<string, Record<string, number>> = {};
    private TotalCountOfLabels: Record<string, number> = {};

    constructor(
        private readonly samples: DataSet[],
        private readonly labels: string[],
    ) {
    }

    train() {
        const labels = this.labels;
        const samples = this.samples;

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

            const words = this.tokenize(sample.data);

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

    predict(sampleText: string) {
        const text = sampleText.split(" ");
        const labels = this.labels;

        const scores: Record<string, Array<number>> = {};
        for (const label of labels) {
            scores[label] = [];
        }

        for (const word of text) {
            // calc prob of this word for all labels

            for (const label of labels) {
                // prob of this word in class label

                const wordProbInLabel =
                    (this.TotalOfAWordPerLabel?.[word]?.[label] || 0) /
                    this.TotalOfAllWordsInLabel[label];

                let TotalOfWordsNotInThisLabel = 0;
                let TotalOfAWordPerNotInThisLabel = 0;

                for (const _label of labels) {
                    if (_label == label) continue;
                    TotalOfWordsNotInThisLabel += this.TotalOfAllWordsInLabel[_label];
                    TotalOfAWordPerNotInThisLabel +=
                        this.TotalOfAWordPerLabel?.[word]?.[_label] || 0;
                }

                const otherP =
                    TotalOfAWordPerNotInThisLabel / TotalOfWordsNotInThisLabel;

                scores[label].push(wordProbInLabel / (wordProbInLabel + otherP) || 0);
            }
        }

        const TotalScores: Record<string, number> = {};
        let highestScore = 0;
        let highest = "";
        for (const label of labels) {
            const Total = scores[label].reduce((acc, val) => acc + val, 0);
            TotalScores[label] = Total;

            if (Total > highestScore) {
                highestScore = Total;
                highest = label;
            }
        }

        return highest;
    }

    tokenize(text: string) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .split(/\s+/)
            .filter(Boolean);
    }

}
