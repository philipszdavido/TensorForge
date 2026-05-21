import PolynomialRegression from "../models/PolyNomialRegression";
import PolynomialRegressionTrainer from "../trainers/PolynomialRegressionTrainer";
import MSELoss from "../loss/MSELoss";
import StochasticGD from "../optimizers/SGD";

// const features = [[-5], [-4], [-3], [-2], [-1], [0], [1], [2], [3], [4], [5]];
// const labels = [16, 9, 4, 1, 0, 1, 4, 9, 16, 25, 36];

const features = [
    [1],
    [2],
    [3],
    [4]
];

const labels = [1, 4, 9, 16];

const poly = new PolynomialRegression(3, features[0].length)
// poly.expandPolynomialFeatures(2);

const trainer = new PolynomialRegressionTrainer(features, labels);
trainer.train(poly, new StochasticGD(poly), MSELoss);

console.log(poly.predict([5]));
