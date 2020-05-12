<template>
    <div class="page">
      <h1>身份证号在线生成器</h1>
      <div class="row">
        <p class="label">选择地址：</p>
        <div class="value">
          <div class="picker address">
            <select id="province" class="form-control" @change="onProvinceChange">
              <option v-for="(p, index) in provinces" :key="index" :value="p.code">{{p.name}}</option>
            </select>
            <select id="city" class="form-control" @change="onCityChange">
              <option v-for="(c, index) in cities" :key="index" :value="c.code">{{c.name}}</option>
            </select>
            <select id="county" class="form-control" @change="onCountryChange">
              <option v-for="(c, index) in countries" :key="index" :value="c.code">{{c.name}}</option>
            </select>
            <button class="btn small">随机</button>
          </div>
        </div>
      </div>
      <div class="row">
        <p class="label">出生日期：</p>
        <div class="value">
          <div class="picker date">
            <select id="year" class="form-control" @change="onYearChange">
              <option v-for="(y, index) in years" :key="index" :value="y" :selected="y === selectedYear">{{y}}</option>
            </select>
            <select id="month" class="form-control" @change="onMonthChange">
              <option v-for="(m, index) in months" :key="index" :value="m" :selected="m === selectedMonth">{{m}}</option>
            </select>
            <select id="day" class="form-control" @change="onDayChange">
              <option v-for="(d, index) in days" :key="index" :value="d">{{d}}</option>
            </select>
            <button class="btn small" @click="randomDate">随机</button>
          </div>
        </div>
      </div>
      <div class="row">
        <p class="label">性别：</p>
        <div class="value">
          <div class="checkgroup">
            <label class="check-item">
              <input type="radio" value="male" name="gender" @change="onCheckChange">
              男
            </label>
            <label class="check-item">
              <input type="radio" value="female" name="gender" @change="onCheckChange">
              女
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <p class="label">
          <select style="width: 100px" @change="onCountChange">
            <option value="10">10条</option>
            <option value="20">20条</option>
            <option value="30">30条</option>
            <option value="50">50条</option>
          </select>
        </p>
        <div class="value">
          <button class="btn big" @click="generate">生成</button>
        </div>
      </div>
      <div class="result">
        <table>
          <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>身份证号</th>
            <th>年龄</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in result" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.card}}</td>
            <td>{{item.age}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import { DateUtil } from 'sn-js-utils'
import ChineseDistricts from './chinese-districts'
import { gen, random } from '../utils/card'

const years = new Array(2021 - 1900).fill(1900).map((n, i) => String(n + i)).reverse()
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const day31 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
const day30 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
const day29 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
const day28 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']

export default {
  name: 'IDCardGenerator',
  data() {
    return {
      provinces: [],
      cities: [],
      countries: [],
      selectedProvinceCode: '',
      selectedCityCode: '',
      selectedCountryCode: '',

      years: years,
      months: months,
      days: day31,
      selectedYear: '1990',
      selectedMonth: '01',
      selectedDay: '01',

      gender: 'male',
      count: 10,
      result: []
    }
  },
  mounted() {
    // 填充初始省市数据
    const provinceLevel = ChineseDistricts['86']
    this.provinces = Object.keys(provinceLevel).map(code => ({ code, name: provinceLevel[code] }))
    this.selectedProvinceCode = this.provinces[0].code

    const cityLevel = ChineseDistricts[this.selectedProvinceCode]
    this.cities = Object.keys(cityLevel).map(code => ({ code, name: cityLevel[code] }))
    this.selectedCityCode = this.cities[0].code

    const countryLevel = ChineseDistricts[this.selectedCityCode]
    this.countries = Object.keys(countryLevel).map(code => ({ code, name: countryLevel[code] }))
    this.selectedCountryCode = this.countries[0].code
  },
  methods: {
    onProvinceChange(evt) {
      this.selectedProvinceCode = evt.target.value

      const cityLevel = ChineseDistricts[this.selectedProvinceCode]
      this.cities = Object.keys(cityLevel).map(code => ({ code, name: cityLevel[code] }))
      this.selectedCityCode = this.cities[0].code

      const countryLevel = ChineseDistricts[this.selectedCityCode]
      this.countries = Object.keys(countryLevel).map(code => ({ code, name: countryLevel[code] }))
      this.selectedCountryCode = this.countries[0].code
    },
    onCityChange(evt) {
      this.selectedCityCode = evt.target.value

      const countryLevel = ChineseDistricts[this.selectedCityCode]
      this.countries = Object.keys(countryLevel).map(code => ({ code, name: countryLevel[code] }))
      this.selectedCountryCode = this.countries[0].code
    },
    onCountryChange(evt) {
      this.selectedCountryCode = evt.target.value
    },

    onYearChange(evt) {
      this.selectedYear = evt.target.value
      this.days = this.calculateDays()
      this.selectedDay = '01'
    },
    onMonthChange(evt) {
      this.selectedMonth = evt.target.value
      this.days = this.calculateDays()
      this.selectedDay = '01'
    },
    onDayChange(evt) {
      this.selectedDay = evt.target.value
    },
    calculateDays() {
      const year = this.selectedYear
      const month = this.selectedMonth

      if (['01', '03', '05', '07', '08', '10', '12'].includes(month)) {
        return day31
      } else if (['04', '06', '09', '11'].includes(month)) {
        return day30
      } else {
        if (DateUtil.isLeapYear(Number(year))) {
          return day29
        } else {
          return day28
        }
      }
    },

    onCheckChange(evt) {
      this.gender = evt.target.value
    },
    onCountChange(evt) {
      this.count = Number(evt.target.value)
    },
    randomAddress() {

    },
    randomDate() {
      this.selectedYear = years[Math.floor(Math.random() * years.length)]
      this.selectedMonth = months[Math.floor(Math.random() * months.length)]
      // this.selectedDay = months[Math.floor(Math.random() * months.length)]
    },
    generate() {
      console.log(this.gender)
      const prefix = this.selectedCountryCode + this.selectedYear + this.selectedMonth + this.selectedDay
      this.result = random(gen(prefix, this.gender), this.count)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    font-size: 18px;
    width: 800px;
    margin: 0 auto;
    padding-bottom: 150px;
    font-family: 'Open Sans', sans-serif, Arial, "Helvetica Neue", Helvetica;

    .btn {
      padding: 5px 20px;
      border-radius: 5px;
      color: #ffffff;
      background-color: #f0ad4e;
      font-size: 14px;
      border: 1px solid #eea236;
      outline: none;
    }
    .btn:hover {
      background-color: #ec971f;
      border-color: #d58512;
      cursor: pointer;
    }
    .btn:active {
      background-color: #d57310;
    }
    .btn.big {
      padding: 10px 50px;
      font-size: 16px;
      font-weight: 600;
    }

    h1 {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }
    .row {
      display: flex;
      align-items: center;
      height: 50px;
      border: 1px solid #eeeeee;
      margin-bottom: 10px;
      padding-left: 20px;

      .label {
        width: 120px;
      }
      .value {
        flex: 1;
      }
      .picker.address {
        select {
          width: 150px;
          margin-right: 10px;
        }
      }
      .picker.date {
        select {
          width: 100px;
          margin-right: 10px;
        }
      }
      .checkgroup {
        .check-item {
          display: inline-block;
          width: 100px;
        }
      }
    }
  }
table {
  width: 100%;
  border-spacing: 0;
  border: 1px solid #dddddd;
  border-collapse: collapse;
  font-size: 16px;
  thead {
    color: #555555;
    font-weight: 600;
    tr {
      background-color: #F5F5F5;
    }
    th {
      border: 1px solid #dddddd;
      padding: 10px 20px;
    }
  }
  tbody {
    tr {
      background-color: #FFFFFF;
    }
    tr:hover {
      background-color: #F5F5F5;
    }
    td {
      border: 1px solid #dddddd;
      padding: 10px 20px;
    }
  }
}
</style>
