export default function rand(rows: number, cols: number) {
  return Array(rows).fill(0).map(() => Array(cols).fill(Math.random()));
}