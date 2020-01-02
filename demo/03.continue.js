var text = "";
var i;
let even = [], odd = []
for (i = 0; i < 10; i++) {
  if (i % 2 === 0) { even.push(i); continue; }
  odd.push(i)
  text += i + " the number is even number.";
}

console.log('Even numbers ', even)
console.log('Odd numbers ' , odd)
