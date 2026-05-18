export interface DataSet {
  data: any[];
  label: string;
}

class NaiveBayes {
  constructor(public readonly sample: DataSet[]) {}
  
}
