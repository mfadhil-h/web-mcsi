<template lang="pug">
.management
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center(v-if="page")
            b-card.section__bg(no-body)
                .section__title {{page.sectionTitle}}
                .section__body {{page.sectionDescription}}
    b-container(fluid).management__org-chart
        b-container.section
            b-row
                b-col(cols="12" md="6" offset-md="3")
                    card-management(
                        v-if="filterOrgchart(orgcharts, true)[0]"
                        :name="filterOrgchart(orgcharts, true)[0].attributes.name"
                        :position="filterOrgchart(orgcharts, true)[0].attributes.position"
                        :id="filterOrgchart(orgcharts, true)[0].id"
                        @click="goToPage(filterOrgchart(orgcharts, true)[0].id)")
            b-row(v-if="filterOrgchart(orgcharts, false)")
                b-col(cols="12" md="6" v-for="(orgchart, index) of filterOrgchart(orgcharts, false)" :key="index")
                    card-management(
                        :name="orgchart.attributes.name"
                        :position="orgchart.attributes.position"
                        :id="orgchart.id"
                        @click="goToPage(orgchart.id)")
</template>
<script lang="ts">
import Vue from 'vue'
import CardManagement from '@/components/CardManagement.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
  name: 'OrgchartMcsi',
  components: {
    CardManagement,
    PageHeader
  },
  layout: 'SinglePage',
  data: () => {
    return {
      orgcharts: [],
      page: {}
    }
  },
  mounted () {
    this.getPage()
    this.getOrgCharts()
  },
  methods: {
    filterOrgchart (orgcharts: any, isPresident: boolean) {
      let result: any
      if (isPresident == true) {
        result = orgcharts.filter((orgchart: any) => orgchart.attributes.order == 1)
      } else {
        result = orgcharts.filter((orgchart: any) => orgchart.attributes.order > 1)
      }
      return result
    },
    async getPage () {
      try {
        const page = await this.$axios.$get('/api/page-organization-chart-etsi?populate=*')
        this.page = page.data.attributes
      } catch (error) { }
    },
    async getOrgCharts () {
      try {
        const orgcharts = await this.$axios.$get('/api/organization-chart-etsis?populate=*&sort[0]=order')
        this.orgcharts = orgcharts.data
      } catch (error) { }
    },
    goToPage (id: number) {
      this.$router.push({ path: `management-etsi/${id}` })
    },
    strapiImage
  }
})
</script>
<style lang="scss" scoped>
.management__org-chart {
    background-color: #EAEAEA;
}
</style>
