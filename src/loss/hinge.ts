import minMax from "../math/minmax";

export default function hinge(yHat: number, y: number) {
    return minMax([0, 1 - (y * yHat)])
}
