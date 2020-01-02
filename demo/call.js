// var person = {
//     firstName:"John",
//     lastName: "Doe",
//     fullName: function () {
//       return this.firstName + " " + this.lastName;
//     }
//   }
// let result =   person.fullName();

// console.log(result)
var person1 = {
    firstName:"Ramesh",
    lastName: "Rathod",
    m1: 10,
    m2: 20
}

var person = {
    fullName: function() {
      return `Hi ${this.firstName} ${this.lastName ? this.lastName : ' '} you secure ${this.m1*this.m2} Marks`
    }
}


let result = person.fullName.call(person1, "Mumbai", "India");

console.log('Final Result ----> ', result)

