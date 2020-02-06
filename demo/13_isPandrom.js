function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
}

let output = isPalindrome("le@vel")
console.log("Output ::", output) ;                   // logs 'true'
