
for(var i =0; i< 5; i++){

    // console.log("Initial log", i)
    // (function(x){
    //     setTimeout(function(){
    //         console.log(x)
    //     }, i*1000)

    // })(i)  //Output ==> 0,1,2,3,4

    setTimeout(function(){
        console.log(i)
    }, i*1000)  //output ==: 5,5,5,5,5

}