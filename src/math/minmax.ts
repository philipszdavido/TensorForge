export default function minMax(values: number[]) {
    const min = Math.min(...values);
    const max = Math.max(...values);

    return values.map(v => (v - min) / (max - min));
}
