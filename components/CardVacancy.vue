<template lang="pug">
b-card.card-vacancy
    .card-vacancy__title {{title}}
    .card-vacancy__meta {{type}}
    .card-vacancy__meta Date Posted: {{date}}
    b-button.card-vacancy__link(variant="primary" @click="onClick") Apply
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   name: 'CardVacancy',
   props: {
      title: String,
      type: String,
      date: String,
      link: String
   },
   methods: {
      onClick() {
         this.$emit('click')
      }
   }
})
</script>
<style lang="scss" scoped>
.card-vacancy {
   border: none;
   box-shadow: 0 4px 8px 0 rgba(black, 0.1);
   margin-bottom: 1rem;
   .card-vacancy__title {
      color: #154d6d;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -5%;
      line-height: 24px;
      margin-bottom: 1rem;
   }
   .card-vacancy__meta {
      color: rgba(black, 0.54);
      font-size: 16px;
      letter-spacing: -5%;
      line-height: 24px;
      margin-bottom: 0.5rem;
   }
   .card-vacancy__link {
      margin-top: 1.5rem;
   }
}
</style>
