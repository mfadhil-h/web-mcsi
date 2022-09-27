<template lang="pug">
.news-detail
   PageHeader(
      :image='strapiImage(this.$axios.defaults.baseURL, blog.attributes.featuredImage)',
      v-if='blog.attributes'
   )
   b-container(fluid)
      b-container.section.section--reading
         b-card.section__bg(no-body)
            .news(v-if='blog.attributes')
               .news__title {{ blog.attributes.title }}
               .news__attr {{ $t("author") }} {{ blog.attributes.author }}, {{ $t("published") }} {{ dayjs(blog.attributes.publishedAt).format("DD-MMM-YYYY") }}
               .news__html(v-html='micromark(blog.attributes.content)')
         .py-4
            page-nav(
               :left-text='$t("navLabel")',
               :left-button-text='$t("nav")',
               @clickLeft='goBack',
               hide-right
            )
</template>

<script lang="ts">
import Vue from 'vue'
import * as dayjs from 'dayjs'
import { micromark } from 'micromark'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
   name: 'NewsDetail',
   components: {
      PageHeader
   },
   layout: 'BlankPage',
   data: () => {
      return {
         blog: {}
      }
   },
   mounted() {
      this.getBlog()
   },
   methods: {
      dayjs,
      async getBlog() {
         try {
            const blog = await this.$axios.$get(
               `/api/blogs/${this.$route.params.id}?populate=*`
            )
            this.blog = blog.data
         } catch (error) {}
      },
      goBack() {
         this.$router.go(-1)
      },
      micromark,
      strapiImage
   }
})
</script>
<style lang="scss" scoped>
.news {
   .news__title {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -5%;
      line-height: 32px;
   }
   .news__attr {
      color: rgba(black, 0.54);
      font-size: 16px;
      letter-spacing: -5%;
      line-height: 24px;
      margin-top: 1rem;
   }
   .news__html {
      margin-top: 4rem;
   }
}
</style>
<i18n>
{
   "id": {
      "author": "Ditulis oleh",
      "nav": "Kembali",
      "navLabel": "Berita",
      "published": "pada"
   },
   "en": {
      "author": "Published by",
      "nav": "Back",
      "navLabel": "News & Insight",
      "published": "at"
   }
}
</i18n>
