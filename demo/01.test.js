var txt = "";
var person = {fname:"Ramesh", lname:"Rathod", age:25, gender: "Male", role: "BackEnd Developer"}; 
var x;
for (x in person) {
  txt += person[x] + " ";
}

console.log(txt)