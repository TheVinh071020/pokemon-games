<template>
  <input
    :id="id"
    :value="value"
    :type="type"
    :class="className"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: ["id", "value", "type", "className", "custom-input"],
};
</script>

<style scoped>
.custom-input {
  border: 1px ridge #dbdbdb;
  border-radius: 10px;
  width: 180%;
  height: 40px;
  padding-left: 10%;
}
</style>
