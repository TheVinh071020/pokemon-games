<template>
  <div class="text-center">
    <v-pagination
      v-model="pageIndex"
      :length="pageLength"
      :total-visible="totalVisible"
      @input="handlePageChange"
    ></v-pagination>
  </div>
</template>
  
  <script>
export default {
  props: {
    pageIndex: {
      type: Number,
      required: true,
    },
    pageLength: {
      type: Number,
      required: true,
    },
    totalVisible: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handlePageChange(newPageIndex) {
      this.$emit("page-changed", newPageIndex);
    },
  },
};
</script>
  
  <style scoped>
/* Thiết lập cho các ô input */
</style>
  