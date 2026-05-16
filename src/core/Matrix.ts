import { Vector } from "./Vector";

// 2d array
export class Matrix {
  private readonly data: Array<Vector> = [];

  constructor(
    private readonly cols: number,
    private readonly rows: number,
  ) {
    for (let index = 0; index < rows; index++) {
      const row = new Vector(cols);

      for (let j = 0; j < cols; j++) {
        const col = j;
        row.set(j, col);
      }

      this.data.push(row);
    }
  }

  get(r: number, c: number) {
    return this.data[r].get(c);
  }

  set(r: number, c: number, data: number) {
    this.data[r].set(c, data);
  }

  // [[0,1,2,3,4,5]]
  static from(arr: Array<Array<number>>) {
    const data = new Matrix(arr.length, arr[0].length);

    for (let index = 0; index < arr.length; index++) {
      const col = arr[index];
      for (let j = 0; j < col.length; j++) {
        data.set(index, j, col[j]);
      }
    }

    return data;
  }

  static fromVector() {}
}
