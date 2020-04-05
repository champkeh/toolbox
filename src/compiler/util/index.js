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

function pad(label, len = 10) {
  if (label.length >= len) {
    return label
  } else {
    return label + ' '.repeat(len - label.length)
  }
}

function printTokens(tokens) {
  for (const { type, text } of tokens) {
    console.log(`${pad(type, 20)}${text}`)
  }
}

exports.isAlpha = isAlpha
exports.isDigit = isDigit
exports.isBlank = isBlank
exports.pad = pad
exports.printTokens = printTokens
