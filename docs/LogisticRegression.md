Real logistic regression pipeline

Forward pass:
    z = Wx + b
    y_hat = sigmoid(z)

Loss:
    BCE(y_hat, y)

Backward pass:
    dL/dW
    dL/db

Optimizer:
    SGD / Adam updates