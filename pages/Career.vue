<template lang="pug">
.career
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container(fluid)
        b-container.section.section--reading.text-center
            .section__title {{data.sectionTitle}}
            .section__body {{data.sectionBody}}
    b-container.section
        div.search
            b-form(inline)
                .mx-auto
                    span.mr-2.mb-1 I am searching for
                    b-form-input.mr-2(type="text" placeholder="Search keyword...")
                    b-form-select.mr-2(:options="data.locations")
                    b-form-select.mr-2(:options="data.jobTypes")
                    b-button(variant="primary" type="submit") Search
        b-row
            b-col(cols="12" md="4" v-for="(vacancy, index) of data.vacancies")
                card-vacancy(
                    :title="vacancy.title"
                    :location="vacancy.location"
                    :job-type="vacancy.jobType"
                    :date="vacancy.date"
                    :link="vacancy.link"
                )
</template>

<script lang="ts">
import Vue from 'vue'
import CardVacancy from '@/components/CardVacancy.vue'
import PageHeader from '@/components/PageHeader.vue'
import Thumbnail from '@/components/Thumbnail.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    heading1: 'Job vacancy',
    heading2: 'Come and Join Us',
    sectionTitle: 'Available Vacancies',
    sectionBody: 'Submit your CV and grow your career with us',
    locations: ['- Select location -', 'Jakarta', 'Palembang', 'Yogyakarta'],
    jobTypes: ['- Select type -', 'Manning', 'Trainer'],
    vacancies: [
        { 
            title: 'Manning Agency',
            location: 'Jakarta',
            jobType: 'Manning',
            date: '1-Jan-2020',
            link: 'https://abc.def'
        },
        { 
            title: 'Trainer',
            location: 'Jakarta',
            jobType: 'Manning',
            date: '1-Jan-2020',
            link: 'https://abc.def'
        }
    ]
}
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
            data: mock,
            dataSelected: {
                image: '',
                year: '',
                label: '',
                description: ''
            }
        }
    },
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
