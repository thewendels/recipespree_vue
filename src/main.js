import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue2Filters from 'vue2-filters';

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
  
Vue.config.productionTip = false;

Vue.use(Vue2Filters);

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
