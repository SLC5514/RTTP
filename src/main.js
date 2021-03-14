import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vhCheck from 'vh-check'
vhCheck('browser-address-bar')

import VueClipboard from 'vue-clipboard2'

import 'normalize.css/normalize.css'
import './vant'
import './rem'
import './styles/main.scss'

Vue.config.productionTip = false

Vue.use(VueClipboard)

Vue.prototype.$oauth = function () {
  const params = new URLSearchParams(window.location.search)
  const openid = params.get('openid') || params.get('openId')
  const redirect = window.location.href
  if (!openid) {
    location.replace('/oauth.html?redirectUrl=' + redirect)
    return false
  }
  return openid
}

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    Vue.prototype.$openId = this.$oauth()
  }
}).$mount('#app')
