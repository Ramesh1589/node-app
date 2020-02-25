
// 1.Next Prime number ?
// 2.Next Palindrom numbers ?
// 3.fubbonacciseries of n numbers ?



// console.log("Output 1 ::", 2+true) //Outpu == 3

// console.log("Output 2 ::", '6'+9)    //Output ==69
// 
// console.log("Output 3 :: ", 4+3+2+"1")  //Output == 91

// console.log("Output 4 :: ",  1 > 1 > 1)  //eg 1>1 ==0 anf 0>1 == false  //output=false

// console.log("Output 5 :: ", "1"+2+4)   //Output: 123

// console.log("Output 6",typeof null, null == undefined)   // bcz tyoeof null is object and oject always true. i.e Output == true

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

// console.log("Output :: 7", [].toString(), [] == true)  //Outputr == False

var myObject = {
   
    someProperty : 'foobar',
   
    someFunction : function () { 

        // console.log("function is Called ::")


    }
}

myObject.someFunction()


//Bind Methods
var employee = {
  
    name: 'Employee1',

    salary: 400,

    deductMonthlyFee: function(fee){

       this.salary = fee ? this.salary - fee : this.salary;

    //    console.log('Output :: ', this.name + ' remaining balance is '+ this.salary)

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

// console.log("Example 1 of Call Method ::", person.fullName.call(person2));

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

// console.log("Exaple 2 of call Method", person.fullName.call(person1, "pune", "india"))



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

// console.log("Example 1 of Call Object", person.fullName.apply(person1))


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

// console.log('*** Example 2 of Apply Methods ***', result)

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

        // console.log('BaseValue', base)
   
        // console.log('NewValue', num)
    
        return base + num;
    }
}

var addTen  = addBase(10);
let result1 = addTen(5); //15
let result2 = addTen(80); //90
let result3 = addTen(-5); //5

// console.log('Currying Result1', result1)


// console.log('Currying Result2', result2)


// console.log('Currying Result3', result3)


//Java Script Chaining 

var obj = {   // every method returns obj---------v
    first: function() { console.log('first');   return obj; },
    second: function() { console.log('second'); return obj; },
    third: function() { console.log('third');   return obj; }
}

let response = obj.first().second().third();

// console.log('Javascript Chaining Example', response.first)



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

// console.log("Dublicate Array ::", dublicate, dublicate1)


//Swapping Two no without temp
function swapNumb(a, b) {
    
    // console.log('before swap: ', 'a: ', a, 'b: ', b);
    
    b = b - a;   //3-2 = 1   ie. b=1
   //---------// 
    a = a + b;    // 2+1= 3  ie a=3
    
    b = a - b;    // 3-1 = 2 ie b= 2
    
    // console.log('after swap: ', 'a: ', a, 'b: ', b);
}
  
swapNumb(2, 3);

//Swap number using bitmanuplation
function swapNumb1(a, b) {
    // console.log("a: " + a + " and b: " + b);
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    // console.log("a: " + a + " and b: " + b);
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

    // console.log("Character countss", charCount)
    return {newString: newStr.join(''), count: charCount};
  }

let string = removeDuplicateChar('Learn more javascript dude');

// console.log('Rervese string -->', string)


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

// console.log('Total number of Zeros', totalZero)


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

    let result = 0 , result2 = 0;
    let index = 1

    for(var i = 1; i <= number; i++){

        console.log("Number", i)

        result+= i

    }

    while(index <= number){
   
        result2+=index

        index++

        console.log("Result of while loop", result2)

    }

    return result

}

let sumAllNumbers = additionsofnumbers(10)

console.log("Additin of n numbers --->", sumAllNumbers)



function removeDuplicates() { 
      
    // Create an array of objects 
    books = [ 
        { title: "C++", author: "Bjarne" }, 
        { title: "Java", author: "James" }, 
        { title: "Python", author: "Guido" }, 
        { title: "Java", author: "James" }, 
    ]; 
      
    // Display the list of array objects 
    // console.log(books); 

    // Declare a new array 
    let newArray = []; 
      
    // Declare an empty object 
    let uniqueObject = {}; 
      
    // Loop for the array elements 
    for (let i in books) { 

        // Extract the title 
        objTitle = books[i]['title']; 

        // Use the title as the index 
        uniqueObject[objTitle] = books[i]; 
    } 

    // console.log("Unique Title -->", uniqueObject)
      
    // Loop to push unique object into array 
    for (i in uniqueObject) { 
        newArray.push(uniqueObject[i]); 
    } 
      
    // Display the unique objects 
    // console.log("Unique Array --->", newArray); 
} 

removeDuplicates()

//OutPut
// Unique Array 
// [
//     { title: 'C++', author: 'Bjarne' },
//     { title: 'Java', author: 'James' },
//     { title: 'Python', author: 'Guido' }
//   ]

//Selecting Random Value From Array

var arr = ["GFG_1", "GeeksForGeeks", 
                "Geeks", "Computer Science Portal"];
var arr2 = [1,2,3,4,5,6,7,8,9,10]                 
function selectRandom() { 
    // console.log("Printing Math Function Logic", Math.floor(Math.random()),  Math.floor(Math.random() * arr.length))
    let randomString =  arr2[Math.floor(Math.random() * arr2.length)]; 
    // console.log("Random String -->", randomString)
}  
selectRandom()


// how-to-check-if-the-given-date-is-weekend
function checkDate() { 
    var date = new Date(); 
    var day = date.getDay(); 
    // console.log("Get Day", day)
    var ans = (day === 6); 
      
    if (ans) { 
        ans = "Today is Weekend."; 
    } else { 
        ans = "Today is not Weekend."; 
    } 
    // console.log("Output::", ans)
    return ans
}  

checkDate()

//Array Sort Methods Implememtion
//Sorting Array in Ascending Order
function sortAscending(){
    
    var series = [1, 0, 0, 0, 1, 1,0];
    return series.sort()
}

let ascending =  sortAscending();

console.log('Sorting Array in Acending Order-->', ascending)

//Sorting Array in Descending Order
function sortDecending(){
    var series = [1,2,3,4,5,6,0,8,9,10,];
    return series.sort((a, b) => b - a)
}

let descending =  sortDecending();

console.log('Sorting Array in Descending Order-->', descending)

//Sorting Array Object on Key Value

function sortArrObject(){

    var items = [
        { name: 'Edward', value: 21 },
        { name: 'Sharpe', value: 37 },
        { name: 'And', value: 45 },
        { name: 'The', value: -12 },
        { name: 'Magnetic', value: 13 },
        { name: 'Zeros', value: 37 }
    ];

    // sort by value
    return items.sort((a, b) => a.value - b.value)

}


let objOrder =  sortArrObject();

console.log('Array Of Objects ===>', objOrder)

function funct(){

        // the array to be sorted
    var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

    // temporary array holds objects with position and sort-value
    var mapped = list.map((el, i)=> {
        return { index: i, value: el.toLowerCase() };
    })

    console.log('Mapped Array Initial Stage', mapped)
    //Output
    // [
    //     { index: 0, value: 'delta' },
    //     { index: 1, value: 'alpha' },
    //     { index: 2, value: 'charlie' },
    //     { index: 3, value: 'bravo' }
    // ]

    // sorting the mapped array containing the reduced values
    mapped.sort((a, b)=> {
        if (a.value > b.value) {
            return 1;
        }
        if (a.value < b.value) {
            return -1;
        }
        return 0;
    });

    console.log('Mapped Arrra Stage 2', mapped)
    //Output 
    // [
    //     { index: 1, value: 'alpha' },
    //     { index: 3, value: 'bravo' },
    //     { index: 2, value: 'charlie' },
    //     { index: 0, value: 'delta' }
    // ]
    // container for the resulting order
    var result = mapped.map(function(el){
        return list[el.index];
        //outout
        // [ 'alpha', 'bravo', 'CHARLIE', 'Delta' ]
    });

    console.log("Funct --->", result)

}

funct()


//Function For To Scheck an Index positionis  Of an Element in arry

function ArrayIndex(){
    var indices = [];
    var array = ['a', 'b', 'a', 'c', 'a', 'd'];
    var element = 'a';
    var idx = array.lastIndexOf(element);
   
    console.log('Index of Element', idx)
   
    while (idx != -1) {

        indices.push(idx);

        idx = (idx > 0 ? array.lastIndexOf(element, idx - 1) : -1);
        //Output
        // [ 4, 2, 0 ]
    }

    console.log('Postions of "a" element in Array',indices);

}
ArrayIndex()


//To find Index Of Large Number from Array
function largeNumber(){

    const array1 = [5, 12, 8, 130, 44];

    const isLargeNumber = (element) => element > 13;
    
    console.log(`Index Of Large Number `, array1.findIndex(isLargeNumber));
    // expected output: 3
    
}

// largeNumber()