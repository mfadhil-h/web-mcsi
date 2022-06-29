<template lang="pug">
.client
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center
            b-row
                b-col(cols="12")
                    .section__title {{page.sectionTitle}}
                    .section__body {{page.sectionDescription}}
        b-container.section.section--reading(v-if="testimonies")
            card-testimony(
                v-for="(testimony, index) of testimonies" 
                :key="index"
                :person="testimony.attributes.person"
                :avatar="strapiImage($axios.defaults.baseURL, testimony.attributes.avatar)"
                :position="testimony.attributes.position"
                :testimony="testimony.attributes.testimony"
            )
                
</template>

<script lang="ts">
import Vue from 'vue'
import CardTestimony from '@/components/CardTestimony.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
    name: 'client',
    layout: 'SinglePage',
    components: {
        CardTestimony,
        PageHeader,
    },
    data: () => {
        return {
            testimonies: [],
            page: {}
        }
    },
    methods: {
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-client?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        async getTestimonies() {
            try {
                let testimonies = await this.$axios.$get('/api/testimonies?populate=*')
                this.testimonies = testimonies.data
                console.log('test', this.testimonies)
            } catch (error) { }
        },
        strapiImage
    },
    mounted() {
        this.getPage()
        this.getTestimonies()
    }
})
</script>
