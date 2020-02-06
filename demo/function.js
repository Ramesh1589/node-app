(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log("Catch Block console :: ", x);
    }
    console.log("Outer Console of x :: ", x);
    console.log("Outer console of y ::", y);
})();

// Output
// Catch Block console :: 1
// Outer Console of x  :: undefined
// Outer Console of y :: 2