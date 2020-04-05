// 定义有限自动机的所有状态
const DfaState = {
  // 初始状态
  Initial: 0,
  // 标识符状态
  Id: 1,
  // 证书字面量状态
  IntLiteral: 2,
  // 比较操作符(>)状态
  GT: 3,
  // 比较操作符(>=)状态
  GE: 4
}

// 定义token类型
const TokenType = {
  Identifier: 'Identifier',
  IntLiteral: 'IntLiteral',
  GT: 'GT',
  GE: 'GE'
}

/**
 * 是否是英文字母字符
 * @param ch
 * @returns {boolean}
 */
function isAlpha(ch) {
  return /^[a-zA-Z]$/.test(ch)
}

/**
 * 是否是数字字符
 * @param ch
 * @returns {boolean}
 */
function isDigit(ch) {
  return /^[0-9]$/.test(ch)
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
    state = DfaState.Id
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
    }
  }

  return tokens
}

const code = 'age >= 45'
const res = tokenize(code)
console.log(res)
