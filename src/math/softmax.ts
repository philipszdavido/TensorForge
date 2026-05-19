export default function softmax(logits: number[]) {
  const exps = logits.map(Math.exp);

  const sum = exps.reduce((a, b) => a + b, 0);

  return exps.map((v) => v / sum);
}
