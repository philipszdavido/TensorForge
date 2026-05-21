import Model from "../models/Model";
import assert from "../assert/assert";
import Optimizer from "./Optimizer";
import Regularizer from "../regularizers/Regularizer";

// Stochastic Gradient Descent
export default class StochasticGD extends Optimizer{

  constructor(
    private readonly model: Model,
    private readonly regularizer?: Regularizer,
    private learningRate = 0.01,
  ) {
    super();
  }

  step() {

    let regGrads: number[] =
        new Array(this.model.getWeights().length).fill(0);

    if (this.regularizer) {
      regGrads =
          this.regularizer.gradient(
              this.model.getWeights()
          );
    }

    const newWeights = this.model.getWeights().map((weight, i) => {

      const totalGrad =
          this.model.getGradWeights()[i] +
          regGrads[i];

      return weight - this.learningRate * totalGrad;
    });

    this.model.setWeights(newWeights);

    const newBias = this.model.getBias() - this.learningRate * this.model.getGradBias();

    this.model.setBias(newBias);

  }

  setLearningRate(l: number) {
    assert(typeof l == "number");
    this.learningRate = l;
  }

}
