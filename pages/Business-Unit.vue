<template lang="pug">
.business-unit
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center
            b-row
                b-col(cols="12")
                    .section__title {{page.sectionTitle}}
                    .section__body {{page.sectionDescription}}
            b-card-group.mt-5(deck)
                card-business-unit(
                    v-for="(unit,index) of businessUnits" 
                    :key="index" 
                    :label="unit.attributes.name" 
                    :description="unit.attributes.description" 
                    :image="strapiImage($axios.defaults.baseURL, unit.attributes.image)")
</template>

<script lang="ts">
import Vue from 'vue'
import CardBusinessUnit from '@/components/CardBusinessUnit.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
    name: 'business-unit',
    layout: 'SinglePage',
    components: {
        CardBusinessUnit,
        PageHeader,
    },
    data: () => {
        return {
            businessUnits: [],
            page: {}
        }
    },
    methods: {
        async getBusinessUnits() {
            try {
                let businessUnits = await this.$axios.$get('/api/business-units?populate=*')
                this.businessUnits = businessUnits.data
            } catch (error) { }
        },
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-business-unit?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        strapiImage
    },
    mounted() {
        this.getPage()
        this.getBusinessUnits()
    }
})
</script>
