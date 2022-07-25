<template lang="pug">
.career
  PageHeader(
    :image="strapiImage($axios.defaults.baseURL, page.headerBackground)",
    :heading1="page.header1",
    :heading2="page.header2",
    v-if="page.headerBackground != null"
  )
  b-container(fluid)
    b-container.section.section--reading.text-center
      b-card.section__bg(no-body)
        .section__title {{ page.sectionTitle }}
        .section__body {{ page.sectionDescription }}
  b-container.section
    b-card.search(no-body)
      b-form(inline)
        .mx-auto
          span.mr-2.mb-1 Filter search
          b-form-select.mr-2(v-model="careerTypeSelected", v-if="careerTypes")
            b-form-select-option(value="0") - Please select type -
            b-form-select-option(
              v-for="(careerType, index) of careerTypes",
              :key="index",
              :value="careerType.id"
            ) {{ careerType.attributes.description }}
          b-button(
            variant="primary",
            @click="filterCareer(careerTypeSelected)"
          ) Search
    b-row(v-if="isFilteredCareers == false")
      b-col(
        cols="12",
        md="4",
        v-for="(career, index) of careers",
        :key="index"
      )
        card-vacancy(
          :title="career.attributes.jobTitle",
          :type="career.attributes.career_type.data.attributes.description",
          :date="dayjs(career.attributes.publishedAt).format('DD-MMM-YYYY')",
          :link="career.attributes.link",
          @click="openJobPage(career.attributes.link)"
        )
    b-row(v-if="isFilteredCareers == true")
      b-col(
        cols="12",
        md="4",
        v-for="(career, index) of filteredCareers",
        :key="index"
      )
        card-vacancy(
          :title="career.attributes.jobTitle",
          :type="career.attributes.career_type.data.attributes.description",
          :date="dayjs(career.attributes.publishedAt).format('DD-MMM-YYYY')",
          :link="career.attributes.link",
          @click="openJobPage(career.attributes.link)"
        )
</template>

<script lang="ts">
import Vue from 'vue'
import * as dayjs from 'dayjs'
import CardVacancy from '@/components/CardVacancy.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
  name: 'CompanyGroup',
  components: {
    CardVacancy,
    PageHeader
  },
  layout: 'SinglePage',
  data: () => {
    return {
      careers: [],
      careerTypes: [],
      careerTypeSelected: 0,
      filteredCareers: [],
      isFilteredCareers: false,
      page: {}
    }
  },
  mounted () {
    this.getPage()
    this.getCareerTypes()
    this.getCareers()
  },
  methods: {
    dayjs,
    async getCareerTypes () {
      try {
        const careerTypes = await this.$axios.get('/api/career-types')
        this.careerTypes = careerTypes.data.data
      } catch (error) {}
    },
    async getCareers () {
      try {
        const careers = await this.$axios.get(
          '/api/careers?populate=*&filters[isOpen][$eq]=true'
        )
        this.careers = careers.data.data
      } catch (error) {}
    },
    async getPage () {
      try {
        const page = await this.$axios.$get('/api/page-career?populate=*')
        this.page = page.data.attributes
      } catch (error) {}
    },
    filterCareer (type: number) {
      let tempCareers = this.careers
      this.isFilteredCareers = false
      if (type == 0) {
        tempCareers = this.careers
      }
      if (type != 0) {
        tempCareers = tempCareers.filter(
          (career: any) => career.attributes.career_type.data.id == type
        )
        this.isFilteredCareers = true
      }
      this.filteredCareers = tempCareers
    },
    openJobPage (link: string) {
      window.open(link, '_blank')
    },
    strapiImage
  }
})
</script>
<style lang="scss" scoped>
.search {
  background-color: #cacaca;
  border-radius: 8px;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
}
</style>
