import assert from "../../assert/assert";
import { Vector } from "../../core/Vector";

// multiply Vectors
export default function dot(a: Vector, b: Vector): number {
  assert(a.length == b.length);

  let sum = 0;
  for (let index = 0; index < a.length; index++) {
    const a1 = a.get(index);
    const b1 = b.get(index);
    if (index == 0) {
      sum = a1 * b1;
      continue;
    }
    sum += a1 * b1;
  }
  return sum;
}
