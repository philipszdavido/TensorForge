//
//  Scalar.hpp
//  TensorForge
//
//  Created by Chidume Nnamdi on 24/07/2026.
//

#ifndef Scalar_hpp
#define Scalar_hpp

#include <stdio.h>

class Scalar {
    
    int data;

public:
    
    Scalar(int data) : data(data) {}
    
    static Scalar* one();
    
};

#endif /* Scalar_hpp */
