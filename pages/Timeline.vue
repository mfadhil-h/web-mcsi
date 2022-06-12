<template lang="pug">
.timeline
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container(fluid)
        b-container.section.section--reading.text-center
            .section__title {{data.sectionTitle}}
            .section__body {{data.sectionBody}}
    b-container
        
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
    milestone: [
        {
            from: new Date(2014,10),
            to: new Date(),
            title: 'Company Name 1',
            subtitle: 'System Engineer',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'company1-logo.png'
        },
        {
            from: new Date(2009,5),
            to: new Date(2013,5),
            title: 'Company Name 2',
            subtitle: 'Programmer',
            content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            image: 'company2-logo.png'
        },
        {
            from: new Date(2000,3),
            to: new Date(2008,12),
            title: 'Company Name 3',
            subtitle: 'Internship / Volunteer',
            content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            image: 'company3-logo.png'
        },
    ]
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

</style>
