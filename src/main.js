import Vue from "vue";
import App from "./App";
import router from "./router";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";

import store from "./store/store"
 
Vue.config.productionTip = false;

Vue.use(Vuetify);


const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#42a5f5",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});
 
new Vue({
  el: "#app",
  vuetify,
  router,
  store,
  components: { App },
  template: "<App/>",
  render: h => h(App)
});
 