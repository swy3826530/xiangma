import Vue from 'vue'
import App from './App'
import axios from  './pages/service/api.js'


Vue.config.productionTip = false
Vue.prototype.$axios = axios


App.mpType = 'app'

// create an axios instance




const app = new Vue({
    ...App
})
app.$mount()
