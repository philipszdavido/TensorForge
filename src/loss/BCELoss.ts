// Binary Cross Entropy
export default function BCELoss(yHat: number, y: number) {
  const eps = 1e-15;

  yHat = Math.max(eps, Math.min(1 - eps, yHat));

  return -(y * Math.log(yHat) + (1 - y) * Math.log(1 - yHat));
}
