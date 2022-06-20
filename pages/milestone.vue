<template lang="pug">
.milestone
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center
            .section__title {{page.sectionTitle}}
            .section__body {{page.sectionDescription}}
    b-container
        .milestone
            timeline.timeline(
                v-for="(item, index) of milestones" 
                :key="index" 
                :title="item.attributes.title" 
                icon="calendar" 
                :timestamp="dayjs(item.attributes.date).format('YYYY')"
                :right="index%2==0")
                b-img.timeline__image(:src="strapiImage($axios.defaults.baseURL, item.attributes.image)")
                .timeline__description {{item.attributes.description}}
</template>

<script lang="ts">
import Vue from 'vue'
import * as dayjs from 'dayjs'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
    name: 'milestone',
    layout: 'SinglePage',
    components: {
        PageHeader,
    },
    data: () => {
        return {
            milestones: [],
            page: {}
        }
    },
    methods: {
        dayjs,
        async getMilestones() {
            try {
                let milestones = await this.$axios.$get('/api/milestones?populate=*')
                this.milestones = milestones.data
                console.log(this.milestones)
            } catch (error) { } 
        },
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-milestone?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        strapiImage
    },
    mounted() {
        this.getPage()
        this.getMilestones()
    }
})
</script>
<style lang="scss" scoped>
.timeline {
    .timeline__image {
        display: inline-block;
        margin-right: 1rem;
        object-fit: cover;
        vertical-align: top;
        width: 140px; height: 140px;

    }
    .timeline__description {
        display: inline-block;
        vertical-align: top;
    }
}
</style>
