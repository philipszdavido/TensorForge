export default function clip(x: number, limit = 1) {
  return Math.max(-limit, Math.min(limit, x));
}
