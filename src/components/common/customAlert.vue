<template>
  <v-alert
    v-if="alertMessage"
    :type="type"
    :color="color"
    :class="size"
    dismissible
  >
    {{ alertMessage }}
  </v-alert>
</template>

<script>
export default {
  props: ["alertMessage", "type", "color", "size"],
};
</script>

<style scoped>
.attackAlert {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px;
  position: fixed;
  top: 100px;
  right: 39%;
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
.releasePokemon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px;
  position: fixed;
  top: 130px;
  right: 90px;
  z-index: 1000;
}
.alert {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px;
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 1000;
}
</style>
