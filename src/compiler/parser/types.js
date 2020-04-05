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

// token数据结构
function Token(type, text) {
  this.type = type
  this.text = text
  this.valid = false
}

exports.DfaState = DfaState
exports.TokenType = TokenType
exports.Token = Token
