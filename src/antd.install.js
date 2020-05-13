import Vue from 'vue'
import {
  Button,
  Upload,
  Icon,
  Tooltip,
  message
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Upload)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.prototype.$message = message
