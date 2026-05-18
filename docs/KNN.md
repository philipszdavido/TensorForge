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
