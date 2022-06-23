<template lang="pug">
.milestone
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center
            b-card.section__bg(no-body)
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
                :right="index%2==0"
                @click="showModalMilestone(strapiImage($axios.defaults.baseURL, item.attributes.image), item.attributes.date, item.attributes.title, item.attributes.description)")
                b-img.timeline__image(:src="strapiImage($axios.defaults.baseURL, item.attributes.image)")
                .timeline__description {{item.attributes.description}}
    b-modal(id="modal-milestone" size="lg" hide-footer centered)
        b-container(fluid).milestone-detail
            b-row
                b-col(cols="12" sm="4")
                    b-img.milestone-detail__image(:src="milestoneSelected.image")
                b-col(cols="12" sm="8")
                    .milestone-detail__date {{dayjs(milestoneSelected.date).format('YYYY')}}
                    .milestone-detail__title {{milestoneSelected.title}}
            b-row.milestone-detail__description
                b-col(cols="12") {{milestoneSelected.description}}
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
            milestoneSelected: {},
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
        showModalMilestone(image: string, date: string, title: string, description: string) {
            this.milestoneSelected = {
                image: image,
                date: date,
                title: title,
                description: description
            }
            this.$bvModal.show('modal-milestone')
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
        border-radius: 8px;
        display: inline-block;
        margin-bottom: 1rem;
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
.milestone-detail {
    .milestone-detail__image {
        width: 100%; height: auto;
    }
    .milestone-detail__date {
        color: rgba(black, .7);
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
    }
    .milestone-detail__title {
        font-size: 28px;
        font-weight: 700;
        letter-spacing: -1px;
        line-height: 32px;
        margin-top: .25rem;
    }
    .milestone-detail__description {
        margin-top: 2rem;
    }
}
</style>
