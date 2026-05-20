import PolynomialRegression from "../models/PolyNomialRegression";

const features = [[-5], [-4], [-3], [-2], [-1], [0], [1], [2], [3], [4], [5]];

const labels = [16, 9, 4, 1, 0, 1, 4, 9, 16, 25, 36];

// @ts-ignore
const poly = new PolynomialRegression(2, features, labels, 1000, 0.01)
poly.expandPolynomialFeatures(2);
poly.train();

console.log(poly.predict([6]));