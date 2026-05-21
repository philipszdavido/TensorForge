import Model from "../models/Model";
import assert from "../assert/assert";
import Optimizer from "./Optimizer";

// Stochastic Gradient Descent
export default class StochasticGD extends Optimizer{

  constructor(
    private readonly model: Model,
    private learningRate = 0.01,
  ) {
    super();
  }

  step() {

    const newWeights = this.model.getWeights().map((weight, i) => {
     return weight - this.learningRate * this.model.getGradWeights()[i];
    });

    this.model.setWeights(newWeights);

    const newBias = this.model.getGradBias() - this.learningRate * this.model.getGradBias();
    
    this.model.setBias(newBias);

  }

  setLearningRate(l: number) {
    assert(typeof l == "number");
    this.learningRate = l;
  }

}
