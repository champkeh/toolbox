import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueClipboards from 'vue-clipboards'
import './antd.install.js'
import 'ant-design-vue/dist/antd.css'

import './main.css'

Vue.config.productionTip = false

Vue.use(VueClipboards)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
