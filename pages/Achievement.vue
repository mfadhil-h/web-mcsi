<template lang="pug">
.achievement
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container(fluid)
        b-container.section.section--reading.text-center
            .section__title {{data.sectionTitle}}
            .section__body {{data.sectionBody}}
    b-container.section
        no-ssr
            div(v-for="(group, index) of data.awardGroup" :key="index")
                .display-2 {{group.label}}
                carousel.carousel(:perPageCustom="[[768, 3], [1024, 4]]")
                    slide.carousel__slide(v-for="(award, index) of group.awards")
                        Thumbnail(:image="award.image" :heading="award.label" :subheading="award.year")
</template>

<script lang="ts">
import Vue from 'vue'
import CardManagement from '@/components/CardManagement.vue'
import PageHeader from '@/components/PageHeader.vue'
import Thumbnail from '@/components/Thumbnail.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    heading1: 'Company',
    heading2: 'Achievement',
    sectionTitle: 'Our Achievement',
    sectionBody: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing, most innovative companies in the world. Together, they support a culture that is progressive, authentic and fun – while living our values and honoring our purpose every day.',
    awardGroup: [
        {
            label: '2021 - Present',
            awards: [
                {
                    label: 'Award 1',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 1'
                },
                {
                    label: 'Award 2',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 2'
                },
                {
                    label: 'Award 3',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 1'
                },
                {
                    label: 'Award 4',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 2'
                },
                {
                    label: 'Award 5',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 1'
                },
                {
                    label: 'Award 6',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 2'
                }
            ]
        },
        {
            label: '2011 - Present',
            awards: [
                {
                    label: 'Award 1',
                    year: '2011',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 3'
                },
                {
                    label: 'Award 2',
                    year: '2012',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 4'
                }
            ]
        }
    ]
}
export default Vue.extend({
    name: 'achievement',
    layout: 'SinglePage',
    components: {
        CardManagement,
        PageHeader,
        Thumbnail
    },
    data: () => {
        return {
            data: mock
        }
    }
})
</script>
<style lang="scss" scoped>
.carousel {
    margin-left: -1rem;
    margin-right: -1rem;
    .carousel__slide {
        padding: 1rem;
    }
}
</style>
