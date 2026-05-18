import Model from "../models/Model";

// Stochastic Gradient Descent
export default class SGD {
  constructor(
    private readonly model: Model,
    private learningRate = 0.01,
  ) {}

  forward() {
    const newWeights = this.model.getWeights().map((weight, i) => {
     return weight - this.learningRate * this.model.gradWeights[i];
    });

    this.model.setWeights(newWeights);
    this.model.setBias(this.model.gradBias);
  }
}
