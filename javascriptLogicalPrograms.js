
1.Next Prime number ?
2.Next Palindrom numbers ?
3.fubbonacciseries of n numbers ?



console.log("Output 1 ::", 2+true) //Outpu == 3

console.log("Output 2 ::", '6'+9)    //Output ==69

console.log("Output 3 :: ", 4+3+2+"1")  //Output == 91

console.log("Output 4 :: ",  1 > 1 > 1)  //eg 1>1 ==0 anf 0>1 == false  //output=false

console.log("Output 5 :: ", "1"+2+4)   //Output: 123

console.log("Output 6",typeof null, null == undefined)   // bcz tyoeof null is object and oject always true. i.e Output == true

// for(var i = 0; i < 10; i++) {
//     setTimeout(function() {
//         console.log(i);  
//     }, 10);
// }


// for(var i = 0; i < 10; i++) {
//     (function(i){
//         setTimeout(function() {
//           console.log(i);  
//         }, 10);
//     })(i)
// }

console.log("Output :: 7", [].toString(), [] == true)  //Outputr == False

var myObject = {
   
    someProperty : 'foobar',
   
    someFunction : function () { 

        console.log("function is Called ::")


    }
}

myObject.someFunction()


//Bind Methods
var employee = {
  
    name: 'Employee1',

    salary: 400,

    deductMonthlyFee: function(fee){

       this.salary = fee ? this.salary - fee : this.salary;

       console.log('Output :: ', this.name + ' remaining balance is '+ this.salary)

       return this.name + ' remaining balance is '+ this.salary; 
    }
}

employee.deductMonthlyFee()

var person = {name: 'Employee2', salary: 1500};

var deduct = 200

var rachelFeeDeductor = employee.deductMonthlyFee.bind(person, deduct);

rachelFeeDeductor()

//Call Methods
// With the call() method, you can write a method that can be used on different objects.


var person = {

    fullName: function () {

        return this.firstName + " " + this.lastName;

    }

}
var person1 = {

    firstName: "Ramesh",

    lastName: "Rathod"

}
var person2 = {

    firstName: "Rajat",

    lastName: "Gupta"

}

console.log("Example 1 of Call Method ::", person.fullName.call(person2));

var person = {

    fullName: function (city, country) {

        return this.firstName + " " + this.lastName + "," + city + "," + country;

    }
}
var person1 = {
    firstName: "John",
    lastName: "Doe"
}
person.fullName.call(person1, "Oslo", "Norway");

console.log("Exaple 2 of call Method", person.fullName.call(person1, "pune", "india"))



//Javascript Apply Methods
var person = {
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName: "Apply Meathod",
    lastName: "Apply Methods"
}
person.fullName.apply(person1);  // Will return "Mary Doe"

console.log("Example 1 of Call Object", person.fullName.apply(person1))


var person = {
    fullName: function (city, country) {
        return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}
var person1 = {
    firstName: "Ramesh",
    lastName: "Rathod"
}
var result = person.fullName.apply(person1, ["Pune", "India"]);

console.log('*** Example 2 of Apply Methods ***', result)

// The Difference Between call() and apply()
// The difference is:

// The call() method takes arguments separately.

// The apply() method takes arguments as an array.



//this keyword

"use strict";
function myFunction() {
  return this;
}

// console.log("This Keyword output ::", myFunction())


// Java script Currrying

function addBase(base) {

    return (num) => {

        console.log('BaseValue', base)
   
        console.log('NewValue', num)
    
        return base + num;
    }
}

var addTen  = addBase(10);
let result1 = addTen(5); //15
let result2 = addTen(80); //90
let result3 = addTen(-5); //5

console.log('Currying Result1', result1)


console.log('Currying Result2', result2)


console.log('Currying Result3', result3)


//Java Script Chaining 

var obj = {   // every method returns obj---------v
    first: function() { console.log('first');   return obj; },
    second: function() { console.log('second'); return obj; },
    third: function() { console.log('third');   return obj; }
}

let response = obj.first().second().third();

console.log('Javascript Chaining Example', response.first)



//Renove Duplicate 
function removeDuplicate(arr) {
    var exists = {},
        outArr = [],
        elm;

    for (var i = 0; i < arr.length; i++) {
        elm = arr[i];
        if (!exists[elm]) {
            outArr.push(elm);
            exists[elm] = true;
        }
    }
    return outArr;
}

let dublicate = removeDuplicate([1, 3, 3, 3, 1, 5, 6, 7, 8, 1]);

//ES6 Removed Duplicates
let dublicate1 =  [...new Set([1, 3, 3, 3, 1, 5, 6, 7, 8, 1])]

console.log("Dublicate Array ::", dublicate, dublicate1)


//Swapping Two no without temp
function swapNumb(a, b) {
    
    console.log('before swap: ', 'a: ', a, 'b: ', b);
    
    b = b - a;   //3-2 = 1   ie. b=1
    
    a = a + b;    // 2+1= 3  ie a=3
    
    b = a - b;    // 3-1 = 2 ie b= 2
    
    console.log('after swap: ', 'a: ', a, 'b: ', b);
}
  
swapNumb(2, 3);

//Swap number using bitmanuplation
function swapNumb1(a, b) {
    console.log("a: " + a + " and b: " + b);
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    console.log("a: " + a + " and b: " + b);
}

swapNumb1(2, 3);


//Character in recursive
function removeDuplicateChar(str){
    var len = str.length,
        char, 
        charCount = {}, 
        newStr = [];
   
    for(var i =0; i<len; i++){
      char = str[i];
      if(charCount[char]){
        charCount[char]++;
      }else{
        charCount[char] = 1;
      }  
    }
    
    for (var j in charCount){
      if (charCount[j]==1)
         newStr.push(j);
    }

    console.log("Character countss", charCount)
    return {newString: newStr.join(''), count: charCount};
  }

let string = removeDuplicateChar('Learn more javascript dude');

console.log('Rervese string -->', string)


//Count Total number of zeros from 1 upto n?
function countZero(n) {
    var count = 0;
    while (n > 0) {
        count += Math.floor(n / 10);
        n = n / 10;
    }
    return count;
}

let totalZero = countZero(2020);

console.log('Total number of Zeros', totalZero)


//Sum of string upto Singl Digits
 //37 //10//1
function sumUptoSingle(n){
    let sum = 0;
    if(n > 0 ) sum  = n % 9 || 9;
    return sum
}

let t1 = sumUptoSingle(191)


// console.log("sum of number upto single digit", t1)

//Addition Of Numbers

function additionsofnumbers(number){

    let result = 0 

    for(var i = 1; i <= number; i++){

        result+= i

    }

    return result

}

let sumAllNumbers = additionsofnumbers(100)

console.log("Additin of n numbers --->", sumAllNumbers)