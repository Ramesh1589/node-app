var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

const output = tokenizer.tokenize("The quick brown fox jumps over the lazy dog")

console.log('Output of above string is', output);
