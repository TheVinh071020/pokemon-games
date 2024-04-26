<template>
    <div class="icon-loading" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomLoading',
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      loadingClass: {
        type: String,
        default: ''
      }
    }
  }
  </script>

<style>
.icon-loading {
  position: absolute;
  left: 50%;
  bottom: 55%;
  position: fixed;
}
</style>
