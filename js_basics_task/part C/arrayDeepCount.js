function deepCount(a){
    if (a.length === 0) {
      return 0;
    } else {
        let arrayLength = a.length;
        a.forEach(elem => {
            //console.log(elem);
            if (Array.isArray(elem)) {
                arrayLength += deepCount(elem);
            }
        });
        return arrayLength;
    }
}
console.log(deepCount([]));//0
console.log(deepCount([1, 2, 3]));//3
console.log(deepCount(["x", "y", ["z"]])); //4
console.log(deepCount([1, 2, [3, 4, [5]]]));//, 7, "Expected 7")
console.log(deepCount([[[[[[[[[]]]]]]]]]));//, 8, "Expected 8")