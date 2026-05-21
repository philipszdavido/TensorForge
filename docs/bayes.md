Gaussian Naive Bayes
Bernoulli Naive Bayes
Multinomial Naive Bayes

## How Naive Bayes Learns

Training phase:

1. Count class frequencies
2. Count feature frequencies
3. Convert counts into probabilities

That is the “learning”.

Random Forest
Many trees together.
tree1
tree2
tree3
...
vote

KMeans Clustering
Groups similar points.

Example:
customers
documents
images

Ridge
Lasso

interface Estimator {
fit(X: Matrix, y: Vector): void
}

interface Predictor {
predict(X: Matrix): Vector
}

interface Transformer {
transform(X: Matrix): Matrix
}
