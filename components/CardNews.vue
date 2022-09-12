<template lang="pug">
b-card.card-news(:img-src='image')
   NuxtLink.card-news__title(:to='`/news/${id}`') {{ title }}
   .card-news__description {{ description }}
   .card-news__meta
      .card-news__timestamp {{ timestamp }}
      .card-news__author {{ $t("author") }} {{ author }}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   name: 'CardBusinessUnit',
   props: {
      id: Number,
      image: String,
      title: String,
      description: String,
      author: String,
      timestamp: String
   }
})
</script>
<style lang="scss" scoped>
.card-news {
   border: none;
   box-shadow: 0 4px 8px 0 rgba(black, 0.1);
   margin-bottom: 1.5rem;
   text-align: left;
   .card-news__title {
      cursor: default;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -5%;
      line-height: 24px;
   }
   .card-news__description {
      color: rgba(black, 0.54);
      font-size: 16px;
      letter-spacing: -5%;
      line-height: 24px;
      margin-top: 1.5rem;
   }
   .card-news__meta {
      font-size: 12px;
      margin-top: 1rem;
      .card-news__timestamp {
         color: rgba(black, 0.87);
         display: inline-block;
         margin-right: 1rem;
      }
      .card-news__author {
         color: rgba(black, 0.54);
         display: inline-block;
      }
   }
}
</style>
<i18n>
{
   "id": {
      "author": "Oleh"
   },
   "en": {
      "author": "By"
   }
}
</i18n>
