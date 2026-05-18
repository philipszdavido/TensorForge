import LogisticExpression from "../models/LogisticRegression";
import DiscretePerceptron from "../models/Perceptron";

// features = [[1,3], [4,2]]
// label    = [ 0,    1]

const bugs = [
  [1, 3],
  [3, 1],
];

const labels = [0, 1];

const lReg = new DiscretePerceptron(bugs, labels);
// lReg.train();

// console.log(lReg.predict([3, 1])); // 1
// console.log(lReg.predict([1, 3])); // 0

// we want to predict if bug is ladybird

// width contributes more to a bug being a ladybird
// length contributes less

// Forward pass
for (let i = 0; i < bugs.length; i++) {

  const yHat = lReg.forward(bugs[i]);

  lReg.backward(i, yHat, bugs[i]);

  
}
