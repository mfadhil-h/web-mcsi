<template lang="pug">
.management
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container(fluid)
        b-container.section.section--reading.text-center
                .section__title {{data.sectionTitle}}
                .section__body {{data.sectionBody}}
    b-container.section
        b-row
            b-col(cols="12" md="4" offset-md="4")
                card-management(name="John Doe" position="CEO")
        b-row
            b-col(cols="12" md="4")
                card-management(name="John Doe" position="CEO")
            b-col(cols="12" md="4")
                card-management(name="John Doe" position="CEO")
            b-col(cols="12" md="4")
                card-management(name="John Doe" position="CEO")
</template>

<script lang="ts">
import Vue from 'vue'
import CardManagement from '@/components/CardManagement.vue'
import PageHeader from '@/components/PageHeader.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    heading1: 'From us to you',
    heading2: 'Management',
    sectionTitle: 'Meet MCSI Management',
    sectionBody: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing, most innovative companies in the world. Together, they support a culture that is progressive, authentic and fun – while living our values and honoring our purpose every day.',
}
export default Vue.extend({
    name: 'management',
    layout: 'SinglePage',
    components: {
        CardManagement,
        PageHeader
    },
    data: () => {
        return {
            data: mock
        }
    }
})
</script>
