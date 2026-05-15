import { Vector } from "./Vector";

export class Matrix {
  data: Array<Vector>;
  constructor(cols: number, rows: number) {
    this.data = new Array(rows).fill(0).map(() => new Vector(new Array(cols).fill(0)));
  }
}
