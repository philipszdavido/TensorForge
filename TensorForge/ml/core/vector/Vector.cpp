//
//  Vector.cpp
//  TensorForge
//
//  Created by Chidume Nnamdi on 24/07/2026.
//

#include "Vector.hpp"

void Vector::set(int index, int newData) {
    data[index] = newData;
}

int Vector::get(int index) {
    return data[index];
}
