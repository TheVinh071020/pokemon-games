<template>
  <component :is="componentToShow" />
</template>

<script>
import Register from "../components/screens/registerScreen.vue";
export default {
  components: { Register },
  data() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    if (!currentUser) {
      return { componentToShow: "Register" };
    } else {
      this.$router.push({ name: "HomePage" });
      return { componentToShow: null };
    }
  },
};
</script>

<style></style>