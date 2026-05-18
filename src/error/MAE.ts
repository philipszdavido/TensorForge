import assert from "../assert/assert";

export default function MAE(x: number[], y: number[]) {
  assert(x.length !== y.length);

  let sum = 0;

  for (let j = 0; j < x.length; j++) {
    sum += Math.abs((sum += x[j] - y[j]));
  }

  return sum / x.length;
}
