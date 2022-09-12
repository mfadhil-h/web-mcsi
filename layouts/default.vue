<template lang="pug">
.default
   .default__container
      h3.default__message
         span Halaman tidak ditemukan!
         small.ml-4 404
   b-button.mt-4(type='button', @click='goBack') Kembali
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   name: 'DefaultLayout',
   methods: {
      goBack() {
         this.$router.go(-1)
      }
   }
})
</script>
<style lang="scss" scoped>
.default {
   display: relative;
   min-height: 100vh;
   .default__container {
      position: absolute;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }
}
</style>
