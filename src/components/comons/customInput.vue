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
  props: ["id", "value", "type", "className"],
};
</script>
  
  <style scoped>
/* Thiết lập cho các ô input */
</style>
  