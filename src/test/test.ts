import { Matrix } from "../core/Matrix";
import KNN, { DataLabel } from "../models/KNN";

const out = new Matrix(3, 2);

out.print()

const A = Matrix.from([
  [1, 2],
  [3, 4],
]);

A.print()

let samples: DataLabel[] = [
  {
    data: [150, 1],
    label: "Apple",
  },
  {
    data: [170, 1],
    label: "Apple",
  },
  {
    data: [130, 0],
    label: "Banana",
  },
  {
    data: [120, 0],
    label: "Banana",
  },
];

const knn = new KNN(samples, 2)

console.log(knn.predict([160, 1]))