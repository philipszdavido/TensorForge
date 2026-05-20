1. Store all training samples
2. For a new sample:
   a. Calculate distance to every point
   b. Sort by distance
   c. Pick K nearest neighbors
   d. Majority vote
3. Return prediction

Think of it like asking neighbors
If you're moving into a neighborhood and ask:
1 person → opinion may be unreliable
5 people → better
100 people → too broad, may lose local relevance
That’s exactly what k does in KNN.


# 1. Weighted KNN

Normal KNN:

every neighbor votes equally

| Distance | Label |
| -------- | ----- |
| 1        | Cat   |
| 2        | Cat   |
| 100      | Dog   |

With normal voting:

Cat = 2
Dog = 1

But what if:

| Distance | Label |
| -------- | ----- |
| 1        | Cat   |
| 2        | Dog   |
| 100      | Dog   |

Normal voting:

Dog wins (2 votes)

But intuitively:

- the Cat point is VERY close
- the Dogs are far away

Weighted KNN fixes this.

Closer neighbors get stronger votes.

## Common weighting

weight = 1 / distance

or:

weight = 1 / (distance + epsilon)

| Distance | Label | Weight |
| -------- | ----- | ------ |
| 1        | Cat   | 1.0    |
| 2        | Dog   | 0.5    |
| 100      | Dog   | 0.01   |


## Full sorting is expensive

Real KNN systems usually only need the smallest K values.

Better approaches:

Max Heap
Partial sort
QuickSelect
KD-Tree
Ball Tree
HNSW
FAISS

6. No normalization

Huge real-world problem.

Suppose features are:

Age = 20
Salary = 1,000,000

Salary dominates distance completely.

KNN NEEDS feature scaling:

- Min-Max Scaling
- Standardization (Z-score)

You already understand the core algorithm correctly.
The next step is learning:

weighted KNN
KD-Trees
Ball Trees
HNSW
vector databases
ANN search
SIMD/vectorized math
batching/GPU search