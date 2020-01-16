//Addition of Array

function UniqArray(arr){
    var res = [];

    for(var i = 0; i < arr.length; i++){
        if(res.indexOf(arr[i]) === -1){
            res.push(arr[i]);
        }
    }
    console.log(res)
    return res;
}

// UniqArray([1,2,3,4,5,5,5,])

let Array =[{
    no:1
},{
    no:1
},{
    no:1
}]

const unique = [...new Set(Array.map(item => "no"))];

console.log(JSON.stringify(unique))
