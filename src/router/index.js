import Vue from "vue";
import Router from "vue-router";
import { homePageRouter } from "./homePageRouter";
import { registerRouter } from "./registerRouter";
import { loginRouter } from "./loginRouter";
import { detailPageRouter } from "./detailPageRouter";
import { cartPageRouter } from "./cartPageRouter";

Vue.use(Router);

export default new Router({
  routes: [
    ...homePageRouter,
    ...registerRouter,
    ...loginRouter,
    ...detailPageRouter,
    ...cartPageRouter,
  ],
});
