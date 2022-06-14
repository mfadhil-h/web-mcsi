<template lang="pug">
.management
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center(v-if="page")
            .section__title {{page.sectionTitle}}
            .section__body {{page.sectionDescription}}
    b-container(fluid).management__org-chart
        b-container.section
            b-row
                b-col(cols="12" md="4" offset-md="4")
                    card-management(
                        v-if="filterManagement(managements, true)[0]"
                        :name="filterManagement(managements, true)[0].attributes.name" 
                        :position="filterManagement(managements, true)[0].attributes.position"
                        :id="filterManagement(managements, true)[0].id")
            b-row(v-if="filterManagement(managements, false)")
                b-col(cols="12" md="4" v-for="(management, index) of filterManagement(managements, false)" :key="index")
                    card-management(
                        :name="management.attributes.name" 
                        :position="management.attributes.position" 
                        :id="management.id")
</template>
<script lang="ts">
import Vue from 'vue'
import CardManagement from '@/components/CardManagement.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
    name: 'management',
    layout: 'SinglePage',
    components: {
        CardManagement,
        PageHeader
    },
    data: () => {
        return {
            managements: [],
            page: {}
        }
    },
    methods: {
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-management?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        async getManagements() {
            try {
                let managements = await this.$axios.$get('/api/managements?populate=*&sort[0]=order')
                this.managements = managements.data
            } catch (error) { }
        },
        filterManagement(managements: any, isPresident: boolean) {
            let result: any
            if (isPresident==true) {
                result = managements.filter((management: any) => management.attributes.order==1)
            } else {
                result = managements.filter((management: any) => management.attributes.order>1)
            }
            return result
        },
        strapiImage
    },
    mounted() {
        this.getPage()
        this.getManagements()
    }
})
</script>
<style lang="scss" scoped>
.management__org-chart {
    background-color: #EAEAEA;
}
</style>
