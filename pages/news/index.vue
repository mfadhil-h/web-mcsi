<template lang="pug">
.news
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid).section
        b-row
            b-col(cols="12" lg="6" offset-lg="3")
                b-row(v-if="blogs")
                    b-col(cols="12" lg="6" v-for="(blog, index) of blogs" :key="index")
                        card-news(
                            :image="strapiImage($axios.defaults.baseURL, blog.attributes.featuredImage)" 
                            :title="blog.attributes.title" 
                            :description="blog.attributes.contentShort" 
                            :timestamp="blog.attributes.author"
                            :author="blog.attributes.author"
                        )
            b-col(cols="12" lg="3")
                p.font-weight-bold Categories
</template>

<script lang="ts">
import Vue from 'vue'
import CardNews from '@/components/CardNews.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
import Thumbnail from '@/components/Thumbnail.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    heading1: 'Get Updates From Us',
    heading2: 'News & Insights',
    sectionTitle: 'Our Milestone',
    sectionBody: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing, most innovative companies in the world. Together, they support a culture that is progressive, authentic and fun – while living our values and honoring our purpose every day.',
    news: [
        {
            title: 'John Lewis to make final journey across Edmund Pettus Bridge in procession',
            description: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge in Selma, Alabama, where he helped lead a march for voting rights in 1965.',
            timestamp: '123',
            author: 'John Doe',
            image: require('@/assets/img/videotron-image.jpg')
        },
        {
            title: 'John Lewis to make final journey across Edmund Pettus Bridge in procession',
            description: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge in Selma, Alabama, where he helped lead a march for voting rights in 1965.',
            timestamp: '123',
            author: 'John Doe',
            image: require('@/assets/img/videotron-image.jpg')
        },
         {
            title: 'John Lewis to make final journey across Edmund Pettus Bridge in procession',
            description: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge in Selma, Alabama, where he helped lead a march for voting rights in 1965.',
            timestamp: '123',
            author: 'John Doe',
            image: require('@/assets/img/videotron-image.jpg')
        },
        {
            title: 'John Lewis to make final journey across Edmund Pettus Bridge in procession',
            description: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge in Selma, Alabama, where he helped lead a march for voting rights in 1965.',
            timestamp: '123',
            author: 'John Doe',
            image: require('@/assets/img/videotron-image.jpg')
        }
    ]
}
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
            blogs: [],
            data: mock,
            dataSelected: {
                image: '',
                year: '',
                label: '',
                description: ''
            },
            page: {}
        }
    },
    methods: {
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
        this.getBlogs()
    }
})
</script>
<style lang="scss" scoped>

</style>
