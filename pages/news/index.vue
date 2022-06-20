<template lang="pug">
.news
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid).section
        b-row
            b-col(cols="12" lg="6" offset-lg="3")
                b-row(v-if="blogs")
                    b-col(cols="12" lg="6" v-for="(blog, index) of blogs" :key="index")
                        card-news(
                            :id="blog.id"
                            :image="strapiImage($axios.defaults.baseURL, blog.attributes.featuredImage)" 
                            :title="blog.attributes.title" 
                            :description="blog.attributes.contentShort" 
                            :timestamp="blog.attributes.author"
                            :author="blog.attributes.author"
                        )
            b-col(cols="12" lg="3")
                p.font-weight-bold Categories
                p
                    font-awesome-icon.fw.mr-2(icon="folder")
                    span All categories
                p(v-for="(category, index) of blogCategories" :key="index") 
                    font-awesome-icon.fw.mr-2(icon="folder")
                    span {{category.attributes.category}}
</template>
<script lang="ts">
import Vue from 'vue'
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
        async getBlogCategories() {
            try {
                let blogCategories = await this.$axios.$get('/api/blog-categories?populate=*')
                this.blogCategories = blogCategories.data
                console.log(this.blogCategories)
            } catch (error) { }
        },
        async getBlogs() {
            try {
                let blogs = await this.$axios.$get('/api/blogs?populate=*')
                this.blogs = blogs.data
                console.log(this.blogs)
            } catch (error) { }
        },
        async getFilteredBlogs(filter: string) {

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

</style>
