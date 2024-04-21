<template>
  <div id="app" class="v-application">
    <router-view />
  </div>
</template>

<script>
import HomePage from "./pages/homePage.vue";
import Register from "./components/screens/registerScreen.vue";
import Login from "./components/screens/loginScreen.vue";
import DetailPage from "./pages/detailPage.vue";

import CartPage from "./pages/cartPage.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    HomePage,
    Register,
    Login,
    DetailPage,
    CartPage,
  },
};
</script>

<style></style>
