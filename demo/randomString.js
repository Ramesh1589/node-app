function RandomChar(num){
    //var string = "abcdefghijklmnopqrstuvwxyz0123456789";
    var string = "abcdefghijklmnopqrstuvwxyz";
    var str = '';
    var i = 0;
    while(i < num){
      str += string.charAt(Math.floor(Math.random() * string.length));
      i++;
    }
    return `${str}-firstName`;
}

let result = RandomChar(5);

console.log('Random String --->', result)