<template lang="pug">
.career
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center
            .section__title {{page.sectionTitle}}
            .section__body {{page.sectionDescription}}
    b-container.section
        div.search
            b-form(inline)
                .mx-auto
                    span.mr-2.mb-1 Filter search
                    b-form-select.mr-2(v-model="careerLocationSelected" v-if="careerLocations")
                        b-form-select-option(value="null") - Please select city -
                        b-form-select-option(v-for="(location, index) of careerLocations" :key="index" :value="location.id") {{location.attributes.city}}
                    b-form-select.mr-2(:options="jobTypes" v-model="jobTypeSelected")
                    b-button(variant="primary" type="submit") Search
        b-row
            b-col(cols="12" md="4" v-for="(career, index) of careers" :key="index")
                card-vacancy(
                    :title="career.attributes.jobTitle"
                    :location="career.attributes.career_location.data.attributes.city"
                    :job-type="career.attributes.jobType"
                    :date="career.attributes.publishedAt"
                    :link="career.attributes.link"
                    @click="openJobPage(career.attributes.link)"
                )
        p {{careerLocationSelected}}
        p {{jobTypeSelected}}
</template>

<script lang="ts">
import Vue from 'vue'
import CardVacancy from '@/components/CardVacancy.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
import Thumbnail from '@/components/Thumbnail.vue'
const jobTypes = [
    { value: null, text: '- Select Job Types -' },
    { value: 'Full Time', text: 'Full Time' },
    { value: 'Part Time', text: 'Part Time' }
]
export default Vue.extend({
    name: 'company-group',
    layout: 'SinglePage',
    components: {
        CardVacancy,
        PageHeader,
        Thumbnail
    },
    data: () => {
        return {
            careers: [],
            careerLocations: [],
            careerLocationSelected: null,
            jobTypes,
            jobTypeSelected: null,
            page: {}
        }
    },
    methods: {
        async getCareerLocations() {
            try {
                let locations = await this.$axios.get('/api/career-locations')
                this.careerLocations = locations.data.data
                console.log('clogs', this.careerLocations)
            } catch (error) { }
        },
        async getCareers(cityId: any, jobType: any) {
            try {
                if (cityId==null && jobType==null) {
                    let careers = await this.$axios.get('/api/careers?populate=*')
                    this.careers = careers.data.data
                    console.log('careers', this.careers)
                }
            } catch (error) { }
            
        },
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-career?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        openJobPage(link: string) {
            window.open(link, '_blank')
        },
        strapiImage
    },
    mounted() {
        this.getPage()
        this.getCareerLocations()
        this.getCareers(this.careerLocationSelected, this.jobTypeSelected)
    }
})
</script>
<style lang="scss" scoped>
.search {
    background-color: #CACACA;
    border-radius: 8px;
    margin-bottom: 2rem;
    padding: 1rem 2rem;
}
</style>
