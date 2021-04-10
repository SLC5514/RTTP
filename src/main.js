import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vhCheck from 'vh-check'
vhCheck('browser-address-bar')

import VueClipboard from 'vue-clipboard2'

import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger_vue.js'

import VConsole from 'vconsole'

const params = new URLSearchParams(window.location.search)
if (params.get('vlog')) {
  Vue.use(new VConsole())
}

import 'normalize.css/normalize.css'
import './vant'
import './rem'
import './styles/main.scss'

Vue.config.productionTip = false

Vue.use(VueClipboard)
Vue.use(AlloyFingerPlugin, {
  AlloyFinger
})

Vue.prototype.$oauth = function () {
  const params = new URLSearchParams(window.location.search)
  const openid = params.get('openid') || params.get('openId')
  const redirect = encodeURIComponent(window.location.href)
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
  watch: {
    $route() {
      Vue.prototype.$params = new URLSearchParams(window.location.search)
    }
  },
  created() {
    Vue.prototype.$openId = this.$oauth()
  }
}).$mount('#app')
