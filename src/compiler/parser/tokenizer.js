// 定义有限自动机的所有状态
const DfaState = {
  // 初始状态
  Initial: 'Initial',
  // 标识符状态
  Id: 'Id',
  // Int关键字识别的中间状态
  Id_int1: 'Id_int1',
  Id_int2: 'Id_int2',
  Id_int3: 'Id_int3',
  // 整数字面量状态
  IntLiteral: 'IntLiteral',
  // 比较操作符(>)状态
  GT: 'GT',
  // 比较操作符(>=)状态
  GE: 'GE',
  // 赋值操作符(=)状态
  Assignment: 'Assignment',
  Plus: 'Plus',
  Minus: 'Minus',
  Star: 'Star',
  Slash: 'Slash'
}

// 定义token类型
const TokenType = {
  Identifier: 'Identifier',
  IntLiteral: 'IntLiteral',
  GT: 'GT',
  GE: 'GE',
  Assignment: 'Assignment',
  Int: 'Int',
  Plus: 'Plus',
  Minus: 'Minus',
  Star: 'Star',
  Slash: 'Slash'
}

/**
 * 是否是英文字母字符
 * @param ch
 * @returns {boolean}
 */
function isAlpha(ch) {
  return /^[a-zA-Z_]$/.test(ch)
}

/**
 * 是否是数字字符
 * @param ch
 * @returns {boolean}
 */
function isDigit(ch) {
  return /^[0-9]$/.test(ch)
}

/**
 * 是否是空白字符
 * @param ch
 * @returns {boolean}
 */
function isBlank(ch) {
  return /[\t ]/.test(ch)
}

function printTokens(tokens) {
  for (const { type, text } of tokens) {
    console.log(`${pad(type, 20)}${text}`)
  }
}

function pad(label, len = 10) {
  if (label.length >= len) {
    return label
  } else {
    return label + ' '.repeat(len - label.length)
  }
}

// token数据结构
function Token(type, text) {
  this.type = type
  this.text = text
  this.valid = false
}

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

const code = '2+3*5'
const tokens = tokenize(code)
printTokens(tokens)
