import BCELoss from "../error/BCELoss";
import LogisticExpression from "../models/LogisticRegression";
import DiscretePerceptron from "../models/Perceptron";
import SGD from "../optimizers/SGD";

// features = [[1,3], [4,2]]
// label    = [ 0,    1]

const bugs = [
  [1, 3],
  [3, 1],
];

const labels = [0, 1];

const lReg = new DiscretePerceptron(bugs, labels);
const optimizer = new SGD(lReg);

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

      lReg.backward(i, yHat, bugs[i]);

      const loss = BCELoss(labels[i], yHat);

      totalLoss += loss;

      optimizer.step();
    }
  }

  console.log(lReg.predict([3, 1])); // 1
  console.log(lReg.predict([1, 3])); // 0

  console.log(epoch, totalLoss / bugs.length);
})();
