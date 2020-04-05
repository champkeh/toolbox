const { isAlpha, isDigit, isBlank } = require('../util')
const { DfaState, TokenType, Token } = require('./types')

// 定义一个全局变量，表示自动机的当前状态
let state = DfaState.Initial

// 开启一个新的token识别
function initToken(ch) {
  const token = new Token()
  if (isAlpha(ch)) {
    if (ch === 'i') {
      state = DfaState.Id_int1
    } else {
      state = DfaState.Id
    }
    token.type = TokenType.Identifier
    token.text = ch
    token.valid = true
  } else if (isDigit(ch)) {
    state = DfaState.IntLiteral
    token.type = TokenType.IntLiteral
    token.text = ch
    token.valid = true
  } else if (ch === '>') {
    state = DfaState.GT
    token.type = TokenType.GT
    token.text = ch
    token.valid = true
  } else if (ch === '=') {
    state = DfaState.Assignment
    token.type = TokenType.Assignment
    token.text = ch
    token.valid = true
  } else if (ch === '+') {
    state = DfaState.Plus
    token.type = TokenType.Plus
    token.text = ch
    token.valid = true
  } else if (ch === '-') {
    state = DfaState.Minus
    token.type = TokenType.Minus
    token.text = ch
    token.valid = true
  } else if (ch === '*') {
    state = DfaState.Star
    token.type = TokenType.Star
    token.text = ch
    token.valid = true
  } else if (ch === '/') {
    state = DfaState.Slash
    token.type = TokenType.Slash
    token.text = ch
    token.valid = true
  } else {
    // 其他字符开头的token被认为是不合法的
    token.valid = false
  }
  return token
}

// 分词
function tokenize(code) {
  const tokens = []
  let token = new Token()

  for (const ch of code) {
    // 根据自动机的当前状态进行处理
    switch (state) {
      case DfaState.Initial:
        token = initToken(ch)
        token.valid && tokens.push(token)
        break
      case DfaState.Id:
        if (isAlpha(ch) || isDigit(ch)) {
          token.text += ch
        } else {
          state = DfaState.Initial
          token = initToken(ch)
          token.valid && tokens.push(token)
        }
        break
      case DfaState.Id_int1:
        if (ch === 'n') {
          state = DfaState.Id_int2
          token.text += ch
        } else if (isAlpha(ch) || isDigit(ch)) {
          state = DfaState.Id
          token.text += ch
        } else {
          state = DfaState.Initial
          token = initToken(ch)
          token.valid && tokens.push(token)
        }
        break
      case DfaState.Id_int2:
        if (ch === 't') {
          state = DfaState.Id_int3
          token.text += ch
        } else if (isAlpha(ch) || isDigit(ch)) {
          state = DfaState.Id
          token.text += ch
        } else {
          state = DfaState.Initial
          token = initToken(ch)
          token.valid && tokens.push(token)
        }
        break
      case DfaState.Id_int3:
        if (isBlank(ch)) {
          state = DfaState.Initial
          token.type = TokenType.Int
        } else if (isAlpha(ch) || isDigit(ch)) {
          state = DfaState.Id
          token.text += ch
        } else {
          state = DfaState.Initial
          token = initToken(ch)
          token.valid && tokens.push(token)
        }
        break
      case DfaState.GT:
        if (ch === '=') {
          state = DfaState.GE
          token.type = TokenType.GE
          token.text += ch
        } else {
          state = DfaState.Initial
          token = initToken(ch)
          token.valid && tokens.push(token)
        }
        break
      case DfaState.GE:
        state = DfaState.Initial
        token = initToken(ch)
        token.valid && tokens.push(token)
        break
      case DfaState.IntLiteral:
        if (isDigit(ch)) {
          token.text += ch
        } else {
          state = DfaState.Initial
          token = initToken(ch)
          token.valid && tokens.push(token)
        }
        break
      case DfaState.Assignment:
        state = DfaState.Initial
        token = initToken(ch)
        token.valid && tokens.push(token)
        break
      case DfaState.Plus:
        state = DfaState.Initial
        token = initToken(ch)
        token.valid && tokens.push(token)
        break
      case DfaState.Minus:
        state = DfaState.Initial
        token = initToken(ch)
        token.valid && tokens.push(token)
        break
      case DfaState.Star:
        state = DfaState.Initial
        token = initToken(ch)
        token.valid && tokens.push(token)
        break
      case DfaState.Slash:
        state = DfaState.Initial
        token = initToken(ch)
        token.valid && tokens.push(token)
        break
    }
  }

  return tokens
}

exports.tokenize = tokenize
