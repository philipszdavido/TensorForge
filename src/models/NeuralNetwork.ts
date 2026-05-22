// set input size
// set hidden layers number and size
// set output size
export default class NeuralNetwork {
constructor(
    private readonly inputSize: number,
    private readonly outputSize: number,
    private readonly hiddenLayers: number[],) {
}
}
