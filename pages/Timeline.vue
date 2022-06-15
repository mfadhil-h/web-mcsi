<template lang="pug">
.timeline
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container(fluid)
        b-container.section.section--reading.text-center
            .section__title {{data.sectionTitle}}
            .section__body {{data.sectionBody}}
    b-container
        hzqing-vue-timeline.test(timelineColor="#5bbcd5" timeContentColor="#fff" :dataList="timeline")
</template>

<script lang="ts">
import Vue from 'vue'
import CardManagement from '@/components/CardManagement.vue'
import PageHeader from '@/components/PageHeader.vue'
import Thumbnail from '@/components/Thumbnail.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    heading1: 'Company',
    heading2: 'Milestone',
    sectionTitle: 'Our Milestone',
    sectionBody: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing, most innovative companies in the world. Together, they support a culture that is progressive, authentic and fun – while living our values and honoring our purpose every day.',
}
export default Vue.extend({
    name: 'company-profile',
    layout: 'SinglePage',
    components: {
        CardManagement,
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
.test {
    z-index: -2;
}
</style>
