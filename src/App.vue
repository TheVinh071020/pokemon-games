<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import HomePage from "./views/homePage.vue";
import RegisterScrreen from "./components/screens/registerScreen.vue";
import LoginScrreen from "./components/screens/loginScreen.vue";
import DetailPage from "./views/detailPage.vue";
import CartPage from "./views/cartPage.vue";


export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    HomePage,
    RegisterScrreen,
    LoginScrreen,
    DetailPage,
    CartPage,
  },
};
</script>

<style></style>
