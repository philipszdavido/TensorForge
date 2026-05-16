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

  length() {
    return this.data.length;
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
