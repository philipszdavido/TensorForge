export default function MSELoss(
    y: number,
    yHat: number
) {
    return (y - yHat) ** 2;
}
