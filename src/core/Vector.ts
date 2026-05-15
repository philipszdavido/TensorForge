// an array
export class Vector extends Array<number> {
  
  constructor(private readonly data: number[]) {
    super(...data);
  }

  get() {
    return this.data;
  }
}
