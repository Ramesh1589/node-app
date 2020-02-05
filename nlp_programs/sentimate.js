const Sentiment =  require('sentiment')

const sentiment = new Sentiment()

const str =  'account balance'

const output = sentiment.analyze(str)

console.log('Output of string ===>', output)