import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'normalize.css/normalize.css'
import 'swiper/css/swiper.css'

import './vant'
import './rem'

import vhCheck from 'vh-check'
vhCheck('browser-address-bar')

import './styles/main.scss'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
