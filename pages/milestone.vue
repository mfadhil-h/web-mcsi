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
                .timeline__details
                    .timeline__title {{item.attributes.title}}
                    small.text-muted.timeline__timestamp {{dayjs(item.attributes.date).format('YYYY')}}
                    .timeline__description 
                        p.mb-0 {{item.attributes.description.substring(0,36)+" ..."}}
                        .timeline__link
                            span Selengkapnya
                            font-awesome-icon.fw.title__arrow.ml-2(icon="circle-arrow-right")
    b-modal(id="modal-milestone" size="lg" hide-footer centered)
        b-container(fluid).milestone-detail
            .text-center
                b-img.milestone-detail__image(:src="milestoneSelected.image")
                .milestone-detail__title {{milestoneSelected.title}}
                .milestone-detail__date {{dayjs(milestoneSelected.date).format('YYYY')}}
            .milestone-detail__description {{milestoneSelected.description}}
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
    cursor: default;
    .timeline__image {
        border-radius: 8px;
        display: inline-block;
        margin-right: 1rem;
        margin-bottom: 1rem;
        object-fit: cover;
        vertical-align: top;
        width: 120px; height: 120px;
        @media screen and (min-width: 1200px) {
            margin-bottom: 0;
        }
    }
    .timeline__details {
        display: inline-block;
        vertical-align: top;
        .timeline__title {
            cursor: default;
            font-weight: 700;
            margin-top: 0;
            color: inherit;
        }
        .timeline__description {
            margin-top: 1rem;
            overflow: hidden;
            width: 100%;
        }
        .timeline__link {
            font-size: 14px;
            margin-top: .5rem;
            opacity: .7;
        }
    }
    
}
.milestone-detail {
    .milestone-detail__image {
        margin-bottom: 2rem;
        max-width: 320px;
        width: 100%; height: auto;
    }
    .milestone-detail__title {
         font-size: 28px;
        font-weight: 700;
        letter-spacing: -1px;
        line-height: 32px;
        margin-bottom: .5rem;
    }
    .milestone-detail__date {
        color: rgba(black, .7);
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        margin-bottom: 2rem;
    }
    .milestone-detail__description {
        margin-top: 2rem;
    }
}
</style>
