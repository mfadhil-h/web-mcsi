<template lang="pug">
.sitemap
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center
            b-card.section__bg(no-body v-if="page")
                .section__title {{page.sectionTitle}}
                .section__body {{page.sectionDescription}}
        b-container.section.section--reading
            b-card.card-sitemap(v-if="page.sitemap")
                p.font-weight-bold Peta Situs
                .sitemap(v-html="micromark(page.sitemap)")
</template>

<script lang="ts">
import Vue from 'vue'
import { micromark } from 'micromark'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'

export default Vue.extend({
   name: 'Sitemap',
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
            const page = await this.$axios.$get('/api/page-sitemap?populate=*')
            this.page = page.data.attributes
         } catch (error) {}
      },
      micromark,
      strapiImage
   }
})
</script>
<style scoped>
.card-sitemap {
   border: none;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
   margin-bottom: 1rem;
}
.sitemap >>> li {
   list-style-type: none !important;
   margin: 0.5rem 0;
}
.sitemap >>> li::before {
   content: '❯';
   margin-right: 1rem;
   opacity: 0.5;
}
</style>
