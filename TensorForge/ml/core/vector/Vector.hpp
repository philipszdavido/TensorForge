//
//  Vector.hpp
//  TensorForge
//
//  Created by Chidume Nnamdi on 24/07/2026.
//

#ifndef Vector_hpp
#define Vector_hpp

#include <stdio.h>
#include <vector>

using namespace std;

class Vector {
    
    vector<int> data;
    
public:
    void set(int index, int data);
    int get(int index);
    
};

#endif /* Vector_hpp */
