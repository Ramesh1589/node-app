
	//This function uses reduce method and it sums all numbers in an array and returns a single value
    function arraySum(arr){
        return arr.reduce((a, b) => {
            return a + b
        }, 0);
    }
    let totalSum =  arraySum([10, 20])
    console.log('Total Sum of Arry ==>', totalSum)
    //This function gets the sum of an array an divides it by the length of the array (It then returns the average value)
    function arrayAverage(arr){
        return arr.reduce((a, b) => {
            return a + b
        }, 0) / (arr.length === 0 ? 1 : arr.length);
    } 

    let avg = arrayAverage([10, 5])
    console.log('Average Value Of Array ==>', avg)

    function arrayMax(arr){
    	return arr.reduce((a, b) => {
    		return Math.max(a, b);
    	})
    }
    let maxNumber = arrayMax([100,0, 20, 30])
    console.log('Max. no. of array', maxNumber)

    function arrayMin(arr){
    	return arr.reduce((a, b) =>{
    		return Math.min(a, b);
    	})
    }

    let minNumber = arrayMin([100,0, 20, 30])
    console.log('Min. no. of array', minNumber)

    function arrayUniq(arr){
        var res = [];
        for (var i = 0; i < arr.length; i++){
            if (res.indexOf(arr[i]) == -1){
                res.push(arr[i]);
            }
        }
        return res;
    }
    
    function arrayUniqSort(arr){
        var res = [];
        for (var i = 0; i < arr.length; i++){
            if (res.indexOf(arr[i]) == -1){
                res.push(arr[i]);
            }
        }
        var sort = res.sort(function(a,b){return a - b;})
        return sort;
    }
    
    function arrayUniqString(arr){
        var res = [];
        for (var i = 0; i < arr.length; i++){
            if (res.indexOf(arr[i]) == -1){
                res.push(arr[i]);
            }
        }
        
        return res.sort();
    }
