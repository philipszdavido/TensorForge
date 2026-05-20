import NaiveBayes, { DataSet, NB } from "../models/NaiveBayes";

const dataset: DataSet[] = [
  {
    data: "click this link to win lottery",
    label: "Spam",
  },
  {
    data: "hello how are you win ?",
    label: "NotSpam",
  },
];

// const nBayes = new NaiveBayes(dataset);
// nBayes.train(["Spam", "NotSpam"]);
// console.log(nBayes.predict("win a lottery"));
//console.log(nBayes._predict("win a lottery"));

const nb = new NaiveBayes();
nb.train(dataset, ["Spam", "NotSpam"])
nb.predict("win a lottery", ["Spam", "NotSpam"]);