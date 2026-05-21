export default abstract class Regularizer {
    abstract gradient(weights: number[]): number[];
}
