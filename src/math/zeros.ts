export default function zeros(rows: number, cols: number) {
  return Array(rows).fill(0).map(() => Array(cols).fill(0));
}