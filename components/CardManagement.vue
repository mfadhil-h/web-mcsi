<template lang="pug">
b-card.card-management
   .card-management__name {{ name }}
   .card-management__position {{ position }}
   .card-management__link(@click='onClick')
      span {{ $t("opinion") }} {{ name }}
      font-awesome-icon.link__arrow(icon='circle-arrow-right')
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   name: 'CardManagement',
   props: {
      name: String,
      position: String,
      id: Number
   },
   methods: {
      onClick() {
         this.$emit('click')
      }
   }
})
</script>
<style lang="scss" scoped>
.card-management {
   border: none;
   box-shadow: 0 4px 8px 0 rgba(black, 0.1);
   margin-bottom: 1rem;
   transition-duration: 100ms;
   &:hover {
      box-shadow: 0 8px 16px 0 rgba(black, 0.1);
      transform: translateY(-2px);
      transition-duration: 300ms;
      .card-management__link {
         .link__arrow {
            opacity: 1;
            transform: translateX(8px);
            transition-duration: 300ms;
         }
      }
   }
   .card-management__name {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -1px;
      line-height: 32px;
   }
   .card-management__position {
      color: rgba(black, 0.54);
      font-size: 18px;
      letter-spacing: -5%;
      line-height: 24px;
      margin-top: 8px;
      margin-bottom: 24px;
      min-height: 48px;
      text-transform: capitalize;
   }
   .card-management__link {
      color: #154d6d;
      cursor: default;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      a {
         color: #154d6d;
         text-decoration: none;
      }
      .link__arrow {
         opacity: 0;
         transition-duration: 100ms;
      }
   }
}
</style>
<i18n>
{
   "id": {
      "opinion": "Pendapat dari"
   },
   "en": {
      "opinion": "Opinion from"
   }
}
</i18n>