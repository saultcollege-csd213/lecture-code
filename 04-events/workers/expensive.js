export function doIt(n) {
    let i = 0;
    while ( i < 100000000*n ) {
        i++;
    }
    return i;
}