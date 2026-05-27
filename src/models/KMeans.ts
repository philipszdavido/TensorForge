import random from "../math/random";
import euclidean_distance from "../math/euclidean_distance";

export interface DataLabel {
    data: number[];
    label: string;
}

export default class KMeans {

    private centroids: Record<string, number[]> = {};
    private distances: Record<string, DataLabel[]> = {};

    constructor(public readonly k: number) {
    }

    train(samples: DataLabel[], iterations = 10) {

        for (let i = 0; i < this.k; i++) {
            this.chooseCentroid(i);
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

    private chooseCentroid(i: number) {
        const key = "C" + i;
        this.centroids[key] = [i, random()];
    }

    private recomputeCentroids() {

        for (const centroidsKey in this.centroids) {

            if (!this.distances[centroidsKey]) continue;

            const points = this.distances[centroidsKey];
            const len = points.length;

            const x_axis = points.reduce((pv, cv, ci) => {
                return pv + cv.data[0];
            }, 0)

            const y_axis = points.reduce((pv, cv, ci) => {
                return pv + cv.data[1];
            }, 0)

            const new_point = [(x_axis) / len, (y_axis) / len]

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
