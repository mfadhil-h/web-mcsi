<template lang="pug">
.page-company-value
   PageHeader(
      :image='strapiImage($axios.defaults.baseURL, page.headerBackground)',
      :heading1='page.header1',
      :heading2='page.header2',
      v-if='page.headerBackground'
   )
   b-container.mt-4.py-4(fluid)
      b-row
         b-col.column__image(cols='12', md='6', v-if='page.imageLeft')
            b-img.mb-4(
               :src='strapiImage($axios.defaults.baseURL, page.imageLeft)'
            )
         b-col.column__values(cols='12', md='6', v-if='page.value1')
            .value(v-html='micromark(page.value1)')
            .value(v-html='micromark(page.value2)')
            .value(v-html='micromark(page.value3)')
            .value(v-html='micromark(page.value4)')
   b-container.py-4
      page-nav(
         left-text='Profil Singkat',
         left-button-text='Kembali',
         @clickLeft='goToAbout',
         hide-right
      )
</template>
<script lang="ts">
import Vue from 'vue'
import { micromark } from 'micromark'
import PageHeader from '@/components/PageHeader.vue'
import PageNav from '@/components/PageNav.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
   name: 'PageCompanyValue',
   components: {
      PageHeader,
      PageNav
   },
   layout: 'SinglePage',
   data: () => {
      return {
         page: {}
      }
   },
   created() {
      this.getPage()
   },
   methods: {
      async getPage() {
         try {
            const page = await this.$axios.$get(
               '/api/page-company-value?populate=*'
            )
            this.page = page.data.attributes
         } catch (error) {}
      },
      goToAbout() {
         this.$router.push('/about')
      },
      micromark,
      strapiImage
   }
})
</script>
<style lang="scss" scoped>
$screen-bp: 768px;
.column__image {
   @media screen and (min-width: $screen-bp) {
      padding-left: 0;
   }
}
.column__values {
   @media screen and (min-width: $screen-bp) {
      padding-right: 0;
   }
}
.value {
   background-color: #beceff !important;
   border-radius: 16px;
   margin-bottom: 1.5rem;
   padding: 2rem;
   @media screen and (min-width: $screen-bp) {
      border-radius: 24px 0 0 24px;
   }
}
</style>
