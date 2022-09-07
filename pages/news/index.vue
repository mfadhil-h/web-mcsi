<template lang="pug">
.news
   PageHeader(
      :image='strapiImage($axios.defaults.baseURL, page.headerBackground)',
      :heading1='page.header1',
      :heading2='page.header2',
      v-if='page.headerBackground != null'
   )
   b-container(fluid)
      b-container.section.section--reading.text-center(v-if='page')
         b-card.section__bg(no-body)
            .section__title {{ page.sectionTitle }}
            .section__body {{ page.sectionDescription }}
   b-container.section
      b-row
         b-col(cols='12', lg='3')
            b-card.category
               .category__header Tags
               .category__label(@click='getBlogs')
                  font-awesome-icon.fw.mr-2(icon='tag')
                  span All tags
               .category__label(
                  v-for='(category, index) of blogCategories',
                  :key='index',
                  @click='getFilteredBlogs(category.attributes.category)'
               )
                  font-awesome-icon.fw.mr-2(icon='tag')
                  span {{ category.attributes.category }}
         b-col(cols='12', lg='8')
            b-row(v-if='blogs')
               b-col(
                  cols='12',
                  lg='6',
                  v-for='(blog, index) of blogs',
                  :key='index'
               )
                  card-news(
                     :id='blog.id',
                     :image='strapiImage($axios.defaults.baseURL, blog.attributes.featuredImage)',
                     :title='blog.attributes.title',
                     :description='blog.attributes.contentShort',
                     :timestamp='dayjs(blog.attributes.publishedAt).format("DD-MMM-YYYY")',
                     :author='blog.attributes.author'
                  )
</template>
<script lang="ts">
import Vue from 'vue'
import * as dayjs from 'dayjs'
import CardNews from '@/components/CardNews.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
import Thumbnail from '@/components/Thumbnail.vue'
export default Vue.extend({
   name: 'CompanyProfile',
   components: {
      CardNews,
      PageHeader,
      Thumbnail
   },
   layout: 'SinglePage',
   data: () => {
      return {
         blogCategories: [],
         blogs: [],
         page: {}
      }
   },
   mounted() {
      this.getPage()
      this.getBlogCategories()
      this.getBlogs()
   },
   methods: {
      dayjs,
      async getBlogCategories() {
         try {
            const blogCategories = await this.$axios.$get(
               '/api/blog-categories?populate=*'
            )
            this.blogCategories = blogCategories.data
         } catch (error) {}
      },
      async getBlogs() {
         try {
            const blogs = await this.$axios.$get(
               '/api/blogs?populate=*&sort[0]=publishedAt%3Adesc'
            )
            this.blogs = blogs.data
         } catch (error) {}
      },
      async getFilteredBlogs(filter: string) {
         try {
            const blogs = await this.$axios.$get(
               `/api/blogs?populate=*&filters[category][category][$contains]=${filter}&sort[0]=publishedAt%3Adesc`
            )
            this.blogs = blogs.data
         } catch (error) {}
      },
      async getPage() {
         try {
            const page = await this.$axios.$get('/api/page-blog?populate=*')
            this.page = page.data.attributes
         } catch (error) {}
      },
      strapiImage
   }
})
</script>
<style lang="scss" scoped>
.category {
   cursor: default;
   margin-bottom: 1.5rem;
   .category__header {
      font-weight: 700;
      margin-bottom: 1.5rem;
   }
   .category__label {
      color: rgba(black, 0.7);
      margin-bottom: 1rem;
      &:hover {
         color: rgba(black, 0.6);
      }
   }
}
</style>
