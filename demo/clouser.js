// A closure is an inner function that has access to the variables in the outer (enclosing) function’s 
//scope chain. 
//The closure has access to variables in three scopes; 
//specifically: (1) variable in its own scope, (2) variables in the enclosing function’s scope, and (3) global variables.


// function outer(){

//     let out = "Outer Variable"
    
//     console.log('Outer Function ::', out)

//     function inner(){

//         let inner = out

//         console.log('Outer Variable ::', inner)

//     }

//     inner()
// }

// outer()



(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1)