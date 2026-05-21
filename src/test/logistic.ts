import BCELoss from "../loss/BCELoss";
import LogisticExpression from "../models/LogisticRegression";
import DiscretePerceptron from "../models/Perceptron";
import StochasticGD from "../optimizers/SGD";

// features = [[1,3], [4,2]]
// label    = [ 0,    1]

const bugs = [
  [1, 3],
  [3, 1],
];

const labels = [0, 1];

const lReg = new LogisticExpression(2);
const optimizer = new StochasticGD(lReg);

// lReg.train();

// console.log(lReg.predict([3, 1])); // 1
// console.log(lReg.predict([1, 3])); // 0

// we want to predict if bug is ladybird

// width contributes more to a bug being a ladybird
// length contributes less

(() => {
  let totalLoss = 0;
  let epoch = 0;

  for (epoch = 0; epoch < 1000; epoch++) {
    for (let i = 0; i < bugs.length; i++) {

      // Forward pass
      const yHat = lReg.forward(bugs[i]);

      lReg.backward(bugs[i], labels[i], yHat);

      const loss = BCELoss(labels[i], yHat);

      totalLoss += loss;

      optimizer.step();
    }
  }

  console.log(
    "Prediction for [4, 1] (Should be close to 1):",
    lReg.predict([4, 1]),
  );
  console.log(
    "Prediction for [1, 4] (Should be close to 0):",
    lReg.predict([1, 4]),
  );

  console.log(`Epoch ${epoch} | Avg Loss: ${totalLoss / bugs.length}`);
})();
