var length = 10;
function fn() {
	console.log("function called", this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
      fn();
      console.log("The Value of function is", arguments)
    arguments[0]();
  }
};

obj.method(fn, 1);

//Outputt 
// function called undefined
// The Value of function is [Arguments] { '0': [Function: fn], '1': 1 }
// function called 2

// finalOutput ==> 2