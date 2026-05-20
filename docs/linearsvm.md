initialize w, b

for epoch in range(E):
  for each (x_i, y_i):
    margin = y_i * (dot(w, x_i) + b)

    if margin >= 1:
        w = w - lr * (2 * w)
    else:
        w = w - lr * (2 * w - C * y_i * x_i)
        b = b + lr * C * y_i