import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy);


Vue.config.productionTip = false

const base = Axios.create({
   baseURL: 'https://pokeapi.co/api/v2/'
 })
Vue.prototype.$http = base;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
