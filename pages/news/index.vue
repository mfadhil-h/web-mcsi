<template lang="pug">
.news
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container.section
        b-row
            b-col(cols="12" lg="3")
                b-card.category
                    .category__header Categories
                    .category__label(@click="getBlogs")
                        font-awesome-icon.fw.mr-2(icon="folder")
                        span All categories
                    .category__label(v-for="(category, index) of blogCategories" :key="index" @click="getFilteredBlogs(category.attributes.category)") 
                        font-awesome-icon.fw.mr-2(icon="folder")
                        span {{category.attributes.category}}
            b-col(cols="12" lg="8")
                b-row(v-if="blogs")
                    b-col(cols="12" lg="6" v-for="(blog, index) of blogs" :key="index")
                        card-news(
                            :id="blog.id"
                            :image="strapiImage($axios.defaults.baseURL, blog.attributes.featuredImage)" 
                            :title="blog.attributes.title" 
                            :description="blog.attributes.contentShort" 
                            :timestamp="dayjs(blog.attributes.publishedAt).format('DD-MMM-YYYY')"
                            :author="blog.attributes.author"
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
    name: 'company-profile',
    layout: 'SinglePage',
    components: {
        CardNews,
        PageHeader,
        Thumbnail
    },
    data: () => {
        return {
            blogCategories: [],
            blogs: [],
            page: {}
        }
    },
    methods: {
        dayjs,
        async getBlogCategories() {
            try {
                let blogCategories = await this.$axios.$get('/api/blog-categories?populate=*')
                this.blogCategories = blogCategories.data
            } catch (error) { }
        },
        async getBlogs() {
            try {
                let blogs = await this.$axios.$get('/api/blogs?populate=*')
                this.blogs = blogs.data
            } catch (error) { }
        },
        async getFilteredBlogs(filter: string) {
            try {
                let blogs = await this.$axios.$get(`/api/blogs?populate=*&filters[category][category][$contains]=${filter}`)
                this.blogs = blogs.data
            } catch (error) { }
        },
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-blog?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        strapiImage
    },
    mounted() {
        this.getPage()
        this.getBlogCategories()
        this.getBlogs()
    }
})
</script>
<style lang="scss" scoped>
.category {
    cursor: default;
    .category__header {
        font-weight: 700;
        margin-bottom: 1.5rem;
    }
    .category__label {
        color: rgba(black, .7);
        margin-bottom: 1rem;
        &:hover {
            color: rgba(black, .6);
        }
    }
}
</style>
