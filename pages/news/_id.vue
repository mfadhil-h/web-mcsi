<template lang="pug">
.news-detail
    PageHeader(:image="data.headingImage")
    b-container(fluid)
        b-container.section.section--reading
            .news
                .news__title {{data.newsTitle}}
                .news__attr By {{data.newsAuthor}}, {{data.newsTimestamp}}
                .news__html(v-html="data.newsHtml")

</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    name: 'John Doe',
    position: 'Chief Executive Officer',
    newsTitle: '20 Years Ago, Steve Jobs Built the ‘Coolest Computer Ever, It Bombed',
    newsHtml: '<p>Article in <strong>HTML</strong> format</p>',
    newsAuthor: 'John Doe',
    newsTimestamp: '12-Jun-2022'
}
export default Vue.extend({
    name: 'news-detail',
    layout: 'SinglePage',
    components: {
        PageHeader
    },
    data: () => {
        return {
            data: mock
        }
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
        color: rgba(black, .54);
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