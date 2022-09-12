<template lang="pug">
.thumbnail(@click="onClick")
    b-img.thumbnail__image(:src="image")
    p.thumbnail__heading {{heading}}
    p.thumbnail__subheading {{subheading}}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   name: 'Thumbnail',
   props: {
      image: String,
      heading: String,
      subheading: String
   },
   methods: {
      onClick() {
         this.$emit('click')
      }
   }
})
</script>
<style lang="scss" scoped>
.thumbnail {
   cursor: pointer;
   margin-bottom: 1rem;
   text-align: center;
   transition-duration: 100ms;
   .thumbnail__image {
      width: 100%;
      height: auto;
      object-fit: cover;
   }
   .thumbnail__heading {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -1px;
      margin-top: 1.5rem;
   }
   .thumbnail__subheading {
      font-size: 16px;
      color: rgba(black, 0.7);
      margin-top: 0.5rem;
   }
   &:hover {
      transition-duration: 300ms;
      .thumbnail__image {
         outline: 2px solid #cc0000;
      }
   }
}
</style>
