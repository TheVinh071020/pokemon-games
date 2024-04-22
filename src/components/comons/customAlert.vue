<template>
  <v-alert
    v-if="alertMessage"
    :type="type"
    :color="color"
    :class="size"
    dismissible
    dense
    outlined
    text
  >
    {{ alertMessage }}
  </v-alert>
</template>

<script>
export default {
  props: ["alertMessage", "type", "color", "size", "catchPokemon"],
};
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px;
  position: fixed;
  top: 20px;
  right: 50px;
  z-index: 1000;
}
.catchPokemon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px;
  position: fixed;
  top: 150px;
  right: 150px;
  z-index: 1000;
}
</style>
