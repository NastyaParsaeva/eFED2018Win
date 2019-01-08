// TODO: implement the four functions specified.
function head(inputArray) {
    return inputArray[0];
}
  
function tail(inputArray) {
    return inputArray.slice(1);
}
  
function init(inputArray) {
    return inputArray.slice(0, inputArray.length-1);
}
  
function last(inputArray) {
    return inputArray[inputArray.length-1];
}

console.log( head([5,1]));//, 5 );
console.log( tail([1]));//, [] );
console.log( init([1,5,7,9]));//, [1,5,7] );
console.log( last([7,2]));//, 2 );