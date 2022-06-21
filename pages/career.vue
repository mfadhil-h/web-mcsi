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
                        b-form-select-option(value="0") - Please select city -
                        b-form-select-option(v-for="(location, index) of careerLocations" :key="index" :value="location.id") {{location.attributes.city}}
                    b-form-select.mr-2(v-model="jobTypeSelected")
                        b-form-select-option(value="") - Please select job type -
                        b-form-select-option(v-for="(jobType, index) of jobTypes" :key="index" :value="jobType.value") {{jobType.text}}
                    b-button(variant="primary" @click="filterCareer(careerLocationSelected, jobTypeSelected)") Search
        b-row(v-if="isFilteredCareers == false")
            b-col(cols="12" md="4" v-for="(career, index) of careers" :key="index")
                card-vacancy(
                    :title="career.attributes.jobTitle"
                    :location="career.attributes.location.data.attributes.city"
                    :job-type="career.attributes.jobType"
                    :date="career.attributes.publishedAt"
                    :link="career.attributes.link"
                    @click="openJobPage(career.attributes.link)"
                )
        b-row(v-if="isFilteredCareers == true")
            b-col(cols="12" md="4" v-for="(career, index) of filteredCareers" :key="index")
                card-vacancy(
                    :title="career.attributes.jobTitle"
                    :location="career.attributes.location.data.attributes.city"
                    :job-type="career.attributes.jobType"
                    :date="career.attributes.publishedAt"
                    :link="career.attributes.link"
                    @click="openJobPage(career.attributes.link)"
                )
</template>

<script lang="ts">
import Vue from 'vue'
import CardVacancy from '@/components/CardVacancy.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
const jobTypes = [
    { value: 'Full Time', text: 'Full Time' },
    { value: 'Part Time', text: 'Part Time' }
]
export default Vue.extend({
    name: 'company-group',
    layout: 'SinglePage',
    components: {
        CardVacancy,
        PageHeader,
    },
    data: () => {
        return {
            careers: [],
            careerLocations: [],
            careerLocationSelected: 0,
            filteredCareers: [],
            isFilteredCareers: false,
            jobTypes,
            jobTypeSelected: "",
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
        async getCareers() {
            try {
                let careers = await this.$axios.get('/api/careers?populate=*')
                this.careers = careers.data.data
                console.log('careers', this.careers)
            } catch (error) { }
            
        },
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-career?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        filterCareer(city: number, jobType: string) {
            let tempCareers = this.careers
            this.isFilteredCareers = false
            if (city==0 && jobType=="") {
                tempCareers = this.careers
            }
            if (city!=0) {
                tempCareers = tempCareers.filter((career: any) => career.attributes.location.data.id == city)
                this.isFilteredCareers = true
            }
            if (jobType!="") {
                tempCareers = tempCareers.filter((career: any) => career.attributes.jobType == jobType)
                this.isFilteredCareers = true
            }
            this.filteredCareers = tempCareers
        },
        openJobPage(link: string) {
            window.open(link, '_blank')
        },
        strapiImage
    },
    mounted() {
        this.getPage()
        this.getCareerLocations()
        this.getCareers()
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
