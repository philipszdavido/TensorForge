import {Vector} from "../core/Vector";

export default function relu(x: number) {
    return Math.max(0, x)
}

export function ReLU(vec: Vector) {

    const v = new Vector(vec.length);

    for (let i = 0; i < vec.length; i++) {
        v.set(i, relu(vec.get(i)));
    }

    return v;

}
