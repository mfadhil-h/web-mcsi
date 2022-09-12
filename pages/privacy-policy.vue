<template lang="pug">
.privacy-policy
   PageHeader(
      :image='strapiImage($axios.defaults.baseURL, page.headerBackground)',
      :heading1='page.header1',
      :heading2='page.header2',
      v-if='page.headerBackground'
   )
   b-container(fluid)
      b-container.section.section--reading.text-center
         b-card.section__bg(no-body, v-if='page')
            .section__title {{ page.sectionTitle }}
            .section__body {{ page.sectionDescription }}
      b-container.section.section--reading
         b-card.section__bg(no-body, v-if='page.privacyPolicy')
            .sitemap(v-html='micromark(page.privacyPolicy)')
</template>

<script lang="ts">
import Vue from 'vue'
import { micromark } from 'micromark'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'

export default Vue.extend({
   name: 'TermsConditions',
   components: {
      PageHeader
   },
   layout: 'SinglePage',
   data: () => {
      return {
         page: {}
      }
   },
   mounted() {
      this.getPage()
   },
   methods: {
      async getPage() {
         try {
            const page = await this.$axios.$get(
               '/api/page-privacy-policy?populate=*'
            )
            this.page = page.data.attributes
         } catch (error) {}
      },
      micromark,
      strapiImage
   }
})
</script>
