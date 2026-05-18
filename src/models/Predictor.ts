export interface Predictor {
  fit: (X: Array<number>, Y: Array<number>) => void;

  train: () => void;
  predict: (
    w1: number,
    x1: number,
    w2: number,
    x2: number,
    bias: number,
  ) => number;
}
