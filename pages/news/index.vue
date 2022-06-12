<template lang="pug">
.news
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container.section
        b-row
            b-col(cols="12" sm="6" md="4" v-for="(item, index) of data.news" :key="index")
                card-news(
                    :image="item.image" 
                    :title="item.title" 
                    :description="item.description" 
                    :timestamp="item.timestamp"
                    :author="item.author"
                )            
</template>

<script lang="ts">
import Vue from 'vue'
import CardNews from '@/components/CardNews.vue'
import PageHeader from '@/components/PageHeader.vue'
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
            data: mock,
            dataSelected: {
                image: '',
                year: '',
                label: '',
                description: ''
            }
        }
    },
    methods: {}
})
</script>
<style lang="scss" scoped>

</style>
