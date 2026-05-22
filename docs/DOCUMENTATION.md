# TensorForgejs Documentation

## Overview

**TensorForgejs** is a modular, extensible machine learning framework for JavaScript and TypeScript. It provides essential mathematical structures (scalars, vectors, matrices, tensors) and a suite of machine learning models, trainers, optimizers, regularizers, and utilities. The framework is designed for learning, experimentation, and building ML algorithms in a familiar language.

- **TypeScript-first**: Written in TypeScript for type safety and modern development.
- **Modular**: Core math, models, optimizers, and trainers are decoupled and reusable.
- **Educational**: Clear, readable code for learning and research.

---

## Installation

Clone the repository and install dependencies:

```sh
git clone https://philipszdavido.github.io/TensorForgejs.git
cd TensorForgejs
npm install
```

---

## Project Structure

- `src/core/` — Core math structures (Matrix, Vector, Tensor)
- `src/math/` — Math operations and utilities
- `src/models/` — Machine learning models (KNN, LinearRegression, LogisticRegression, etc.)
- `src/optimizers/` — Optimizers (SGD, etc.)
- `src/regularizers/` — Regularization techniques (Lasso, Ridge)
- `src/loss/` — Loss functions (MSE, BCE)
- `src/trainers/` — Training utilities
- `src/error/` — Error metrics and logging
- `test/` — Example and test scripts

---

## Core Concepts

### Math Structures
- **Scalar**: Single number (e.g., `5`)
- **Vector**: 1D array (e.g., `[1, 2, 3]`)
- **Matrix**: 2D array (e.g., `[[1, 2], [3, 4]]`)
- **Tensor**: ND array (e.g., `[[[...]]]`)

### Main Classes
- **Vector**: 1D array with methods for sum, average, multiplication, etc.
- **Matrix**: 2D array supporting get/set, multiplication, and more.
- **Tensor**: ND array, supports zeros, clone, etc.

---

## Math Operations

- **Elementwise Operations**: Addition, multiplication, etc.
- **Dot Product**: `dot(a, b)`
- **Sum/Average**: `sum(vec)`, `avg(vec)`
- **Matrix Multiplication**: `matmul(a, b)`
- **Random/Ones/Zeros**: `rand(rows, cols)`, `ones(rows, cols)`, `zeros(rows, cols)`
- **Activation Functions**: `sigmoid(x)`, `relu(x)`
- **Other**: `arange(n)`, `reshape`, `transpose`, `gather`, `scatter`, `slice`

---

## Machine Learning Models

- **K-Nearest Neighbors (KNN)**: Classification based on closest samples.
- **Linear Regression**: Predicts continuous values using a linear approach.
- **Logistic Regression**: Binary classification using sigmoid activation.
- **Naive Bayes**: Probabilistic classifier based on Bayes' theorem.
- **Perceptron**: Simple binary classifier, extension of logistic regression.

### Model API Example

```typescript
import { Matrix, Vector } from '../src/core';
import KNN from '../src/models/knn/KNN';

const samples = [
  { data: [1, 2], label: 'A' },
  { data: [2, 3], label: 'B' },
  { data: [3, 4], label: 'A' },
];
const knn = new KNN(samples, 2);
const prediction = knn.predict([2, 3]);
console.log('KNN Prediction:', prediction);
```

---

## Trainers

- **Trainer**: Abstract class for training models.
- **LinearRegressionTrainer**: Trains linear regression models.

### Example
```typescript
import LinearRegressionTrainer from '../src/trainers/LinearRegression';
import LinearRegression from '../src/models/LinearRegression';
import StochasticGD from '../src/optimizers/SGD';
import MSELoss from '../src/loss/MSELoss';

const x = [[1, 2], [2, 3], [3, 4]];
const y = [3, 5, 7];
const model = new LinearRegression(2);
const optimizer = new StochasticGD(model);
const trainer = new LinearRegressionTrainer(x, y, 100);
trainer.train(model, optimizer, MSELoss);
```

---

## Optimizers

- **StochasticGD**: Stochastic Gradient Descent optimizer.
- **Optimizer**: Abstract base class for optimizers.

---

## Regularizers

- **Lasso**: L1 regularization.
- **Ridge**: L2 regularization.
- **Regularizer**: Abstract base class for regularizers.

---

## Loss Functions

- **MSELoss**: Mean Squared Error for regression.
- **BCELoss**: Binary Cross Entropy for classification.

---

## Error Metrics

- **error**: Simple error calculation (difference between predicted and actual).
- **MAE, MSE, RMSE**: Available in `src/error/`.

---

## Usage Example

```typescript
import { Matrix, Vector } from '../src/core';
import KNN from '../src/models/knn/KNN';

const v = new Vector(3);
v.set(0, 1);
v.set(1, 2);
v.set(2, 3);

const m = Matrix.from([
  [1, 2, 3],
  [4, 5, 6],
]);

const samples = [
  { data: [1, 2], label: 'A' },
  { data: [2, 3], label: 'B' },
  { data: [3, 4], label: 'A' },
];
const knn = new KNN(samples, 2);
const prediction = knn.predict([2, 3]);
console.log('KNN Prediction:', prediction);
```

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or documentation improvements.

---

## License

This project is licensed under the ISC License. See the LICENSE file for details.

Libraries:

asciichart
cli-chart

--------------------------------
Epoch: 22
Loss: 0.0021
Accuracy: 98%
--------------------------------
[ LIVE LOSS GRAPH ]
--------------------------------
