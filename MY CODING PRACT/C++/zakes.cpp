#include <iostream>
#include <cstdlib>  // Required for system()

using namespace std;

void swap(int a, int b) {
    int c;

    c = a;
    a = b;
    b = c;

    cout << "a was : " << c << " and b was : " << a << " Now a is : " << a << " and b is :" << b << endl;
}

int main() {
    system("clear");

    int a = 1;
    int b = 2;

    swap(a, b);

    return 0;
}
