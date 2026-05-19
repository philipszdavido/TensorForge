// a 1D array
export class Vector {
  private readonly data: Float32Array;

  constructor(size: number) {
    this.data = new Float32Array(size);
  }

  set(i: number, data: number) {
    this.data[i] = data;
  }

  get(index: number) {
    return this.data[index];
  }

  get length() {
    return this.data.length;
  }

  sum(): number {
    let result = 0;
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      if (index == 0) {
        result = element;
        continue;
      }

      result += element;
    }
    return result;
  }

  mul(): number {
    let result = 0;
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      if (index == 0) {
        result = element;
        continue;
      }
      result *= element;
    }
    return result;
  }

  avg(): number {
    let result = 0;
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      if (index == 0) {
        result = element;
        continue;
      }

      result += element;
    }
    return result / this.length;
  }

  static fromData(data: Float32Array) {
    const newData = new Vector(data.length);

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      newData.set(index, element);
    }

    return newData;
  }

  static from(array: Array<number>): Vector {
    const newData = new Vector(array.length);

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      newData.set(index, element);
    }

    return newData;
  }
}
