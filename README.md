# TensorForge: Machine Learning framework for JavaScript

TensorForge is a modular machine learning framework for JavaScript and TypeScript. It provides essential mathematical structures (scalars, vectors, matrices, tensors) and a growing suite of machine learning models and utilities, making it easy to build, experiment, and learn about ML algorithms in a familiar language.

## Features

- **Core Math Structures:**
	- Scalar (single number)
	- Vector (1D array)
	- Matrix (2D array)
	- Tensor (ND array)
- **Mathematical Operations:**
	- Elementwise addition, multiplication, dot product, sum, average, reshape, transpose, and more
	- Random, zeros, and ones matrix generation
	- Activation functions (e.g., sigmoid, relu)
- **Machine Learning Models:**
	- K-Nearest Neighbors (KNN)
	- Linear Regression
	- Logistic Regression
- **Error Metrics:**
	- Mean Squared Error (MSE)
	- Custom error functions
- **TypeScript Support:**
	- Written in TypeScript for type safety and modern development

## Installation

```sh
git clone https://github.com/yourusername/TensorForge.git
cd TensorForge
npm install
```

## Usage Example

```typescript
import { Matrix, Vector } from './src/core';
import KNN from './src/models/KNN';

// Create a vector
const v = new Vector(3);
v.set(0, 1);
v.set(1, 2);
v.set(2, 3);

// Create a matrix
const m = Matrix.from([
	[1, 2, 3],
	[4, 5, 6],
]);

// Use KNN (example)
const samples = [
	[1, 2],
	[2, 3],
	[3, 4],
];
const knn = new KNN(samples);
const prediction = knn.predict([2, 3]);
console.log('KNN Prediction:', prediction);
```

## Project Structure

- `src/core/` — Core math structures (Matrix, Vector, Tensor)
- `src/math/` — Math operations and utilities
- `src/models/` — Machine learning models (KNN, LinearRegression, LogisticRegression)
- `src/assert/` — Assertion utilities
- `src/error/` — Error metrics and logging
- `test/` — Example and test scripts

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for new features, bug fixes, or documentation improvements.

## License

[ISC](LICENSE)

---

**TensorForge** — Build, learn, and experiment with machine learning in JavaScript/TypeScript.


- Scalar = single number
- Vector = 1D
- Matrix = 2D
- Tensor = ND


- 5                    -> scalar
- [1,2,3]              -> vector
- [[1,2],[3,4]]        -> matrix
- [[[...]]]            -> tensor

