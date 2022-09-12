<template lang="pug">
.page-header
    b-img.page-header__image(:src="image")
    .page-header__title
        .title__heading-1 {{heading1}}
        .title__heading-2 {{heading2}}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   name: 'PageHeader',
   props: {
      heading1: String,
      heading2: String,
      image: String
   },
   data: () => {
      return {}
   }
})
</script>
<style lang="scss" scoped>
.page-header {
   position: relative;
}
.page-header__image {
   filter: brightness(50%);
   height: auto;
   max-height: 360px;
   width: 100%;
   object-fit: cover;
}
.page-header__title {
   color: white;
   position: absolute;
   text-align: center;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   .title__heading-1 {
      font-size: 24px;
      letter-spacing: -5%;
      line-height: 32px;
   }
   .title__heading-2 {
      font-size: 40px;
      font-weight: 700;
      letter-spacing: -5%;
      line-height: 48px;
   }
   @media screen and (max-width: 767px) {
      // background-color: rgba(black, .7);
      padding: 1rem;
      top: inherit;
      bottom: 0;
      left: 0;
      text-align: left;
      transform: translate(0, 0);
      width: 100%;
      .title__heading-1 {
         font-size: 16px;
         line-height: 24px;
      }
      .title__heading-2 {
         font-size: 24px;
         line-height: 32px;
      }
   }
}
</style>
