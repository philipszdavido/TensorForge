export class Tensor {
  constructor(public data: number[]) {}

  static zeros(size: number) {
    return new Tensor(new Array(size).fill(0));
  }

  clone() {
    return new Tensor([...this.data]);
  }
}
