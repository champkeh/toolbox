import { DateUtil } from 'sn-js-utils'

const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
const checks = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

const cards = {}

export function gen(prefix, gender) {
  console.log('prefix: ', prefix)

  cards[prefix] = []
  // if (cards[prefix]) {
  //   console.log('exist prefix data: ', cards[prefix])
  //   return cards[prefix]
  // } else {
  //   console.log('not exist prefix data, generate now...')
  //   cards[prefix] = []
  // }

  const age = calcAge(prefix.substr(6, 8)).year

  let sum = 0
  for (let i = 0; i < prefix.length; i++) {
    sum += Number(prefix[i]) * weights[i]
  }

  for (let i = 0; i < 9999; i++) {
    let s = sum
    const ge = i % 10
    const shi = Math.floor(i % 100 / 10)
    const bai = Math.floor(i % 1000 / 100)
    const qian = Math.floor(i % 10000 / 1000)
    s += (shi * weights[16] + bai * weights[15] + qian * weights[14])
    const mask = s % 11
    if (String(ge) === checks[mask]) {
      if (gender === 'female' && (shi % 2 === 0)) {
        const card = prefix + pad(String(i), 4)
        cards[prefix].push({ name: '随机', card: card, age: age })
      } else if (gender === 'male' && (shi % 2 === 1)) {
        const card = prefix + pad(String(i), 4)
        cards[prefix].push({ name: '随机', card: card, age: age })
      }
    }
  }
  return cards[prefix]
}

function pad(s, len) {
  if (s.length < len) {
    return '0'.repeat(len - s.length) + s
  }
  return s
}

function calcAge(birth) {
  const now = new Date()

  const yearStart = DateUtil.getDateStart(now, 0)
  const yearEnd = DateUtil.getDateEnd(birth, 0, 'yyyyMMdd')
  let year = yearStart.getFullYear() - (yearEnd.getFullYear() + 1)
  const day1 = DateUtil.getDateDiff(yearStart, new Date()).Day
  const day2 = DateUtil.getDateDiff(birth, yearEnd, 'yyyyMMdd').Day + 1
  let day = day1 + day2
  if (day >= 365) {
    year += 1
    day %= 365
  }
  return {
    year,
    day
  }
}

export function check(card) {
  if (!card || card.length !== 18) {
    return false
  }

  let sum = 0
  for (let i = 0; i < card.length - 1; i++) {
    sum += Number(card[i]) * weights[i]
  }
  if (card[17].toUpperCase() === checks[sum % 11]) {
    return true
  } else {
    return false
  }
}

export function random(array, count) {
  if (array.length <= count) {
    return array
  }

  const result = {}
  // 随机取出 count 条数据
  while (count > 0) {
    const idx = Math.floor(Math.random() * array.length)
    if (result[idx]) {
      continue
    }
    result[idx] = array[idx]
    count--
  }

  return Object.values(result)
}
