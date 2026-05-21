# RIDGE REGRESSION

Now we move into regularization.

Problem: Overfitting

Suppose model:

y = w1 x1 + w2 x2 + b

Training may produce huge weights:

w1 = 10000
w2 = -9999

Model memorizes noise.

Ridge Solution

Add penalty:

Loss=MSE+λ∑(wi)^2

This discourages huge weights.
