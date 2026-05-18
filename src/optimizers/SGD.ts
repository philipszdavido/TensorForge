import Model from "../models/Model";

// Stochastic Gradient Descent
export default class SGD {
  constructor(
    private readonly model: Model,
    private learningRate = 0.01,
  ) {}

  step() {

    const newWeights = this.model.getWeights().map((weight, i) => {
     return weight - this.learningRate * this.model.getGradWeights()[i];
    });

    this.model.setWeights(newWeights);

    const newBias = this.model.getGradBias() - this.learningRate * this.model.getGradBias();
    
    this.model.setBias(newBias);

  }
}
