var a={},
    b={key:'b'},
    c={key:'c'};

console.log('Object Console ', b, c)   

a[b]=123;
a[c]=456;

console.log(JSON.stringify(a), a[b]); //output == 456
