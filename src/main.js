import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { handleDate } from "./assets/js/handleDate";
Vue.prototype.handleDate = handleDate;

import axios from 'axios'
Vue.prototype.axios = axios;

import jquery from 'jquery'
Vue.prototype.$ = jquery;
Vue.prototype.jQuery = jquery;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
