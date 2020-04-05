const { printTokens } = require('./util')
const { tokenize } = require('./parser/tokenizer')

const code = '2+3*5'
const tokens = tokenize(code)
printTokens(tokens)
