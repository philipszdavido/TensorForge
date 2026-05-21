import { Matrix } from "../core/Matrix";
import KNN, { DataLabel } from "../models/knn/KNN";

const out = new Matrix(3, 2);

out.print();

const A = Matrix.from([
  [1, 2],
  [3, 4],
]);

A.print();
