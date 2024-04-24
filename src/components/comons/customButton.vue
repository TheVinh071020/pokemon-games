<template>
  <v-btn
    :style="style"
    :color="color"
    :type="type"
    :class="size"
    @click="handleClick"
  >
    {{ value }}
  </v-btn>
</template>

<script>
export default {
  props: ["value", "type", "color", "style", "size"],
  methods: {
    handleClick() {
      this.$emit("custom-click");
    },
  },
};
</script>

<style scoped>
.v-btn.medium {
  width: 120px;
  height: 60px;
  font-size: medium;
}
.v-btn.large {
  width: 200px;
  height: 100px;
  font-size: large;
}
.v-btn.small {
  width: 80px;
  height: 40px;
  font-size: small;
}
</style>
