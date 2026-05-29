import random from "../math/random";
import euclidean_distance from "../math/euclidean_distance";

export interface DataLabel {
    data: number[];
    label: string;
}

// Algorithm: K-Means Clustering
// --------------------------------------------------------------
//     Input: Dataset X, Number of clusters K
// Output: Centroids μ, Cluster Assignments S
//
// 1. Initialize K cluster centroids (μ_1, μ_2, ..., μ_K) randomly or via K-Means++.
// 2. Repeat until convergence:
//     a. Expectation Step (Assignment):
// Assign each data point x_i to the closest centroid:
//     S_j = { x_i : ||x_i - μ_j||^2 <= ||x_i - μ_l||^2 for all l = 1,...,K }
//
// b. Maximization Step (Update):
// Recalculate the position of each centroid by taking the mean of all points assigned to it:
//     μ_j = (1 / |S_j|) * Sum(x_i) for x_i in S_j
//
//     3. Stop when centroids stop moving, or maximum iterations are reached.
// --------------------------------------------------------------

export default class KMeans {

    private centroids: Record<string, number[]> = {};
    private distances: Record<string, DataLabel[]> = {};

    constructor(public readonly k: number) {
    }

    train(samples: DataLabel[], iterations = 10) {

        for (let i = 0; i < this.k; i++) {
            this.chooseCentroid(i, samples[i].data);
        }

        for (let iter = 0; iter < iterations; iter++) {

            this.distances = {}

            for (let i = 0; i < samples.length; i++) {
                const sample = samples[i].data;
                const distances: Record<string, number> = {};

                for (let center in this.centroids) {
                    distances[center] = euclidean_distance(sample, this.centroids[center])
                }

                const leastKey = this.getLeastKey(distances)

                if (!this.distances[leastKey]) {
                    this.distances[leastKey] = []
                }

                this.distances[leastKey].push(samples[i]);

            }

            // Recompute Centroids
            this.recomputeCentroids()

        }

    }

    private chooseCentroid(i: number, point: number[]) {
        const key = "C" + i;
        this.centroids[key] = point;
    }

    private recomputeCentroids() {

        const dimensions = Object.values(this.centroids)[0].length;

        for (const centroidsKey in this.centroids) {

            if (!this.distances[centroidsKey]) continue;

            const points = this.distances[centroidsKey];
            const len = points.length;
            const new_point = new Array(dimensions).fill(0);

            for (let i = 0; i < dimensions; i++) {
                let sum = 0;
                for (let j = 0; j < len; j++) {
                    sum += points[j].data[i];
                }
                new_point[i] = sum / len;
            }

            this.centroids[centroidsKey] = new_point;

        }

    }

    getCentroid(i: number) {
        return this.centroids[i];
    }

    getDistance(i: number) {
        return this.distances[i];
    }

    getCentroids() {
        return this.centroids;
    }

    getDistances() {
        return this.distances;
    }

    predict(x: number, y: number) {

        const distances: Record<string, number> = {};

        for (let center in this.centroids) {
            distances[center] = euclidean_distance([x, y], this.centroids[center])
        }

        return this.getLeastKey(distances);

    }

    private getLeastKey(distances: Record<string, number>) {
        let leastKey = ""
        let leastValue: number;

        Object.keys(distances).forEach((key) => {
            if (!leastValue) {
                leastKey = key;
                leastValue = distances[key];
            } else {

                if (distances[key] <= leastValue) {
                    leastKey = key;
                    leastValue = distances[key];
                }

            }
        })

        return leastKey
    }
}
