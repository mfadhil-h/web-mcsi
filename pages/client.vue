<template lang="pug">
.client
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center
            b-row
                b-col(cols="12")
                    .section__title {{page.sectionTitle}}
                    .section__body {{page.sectionDescription}}
        b-container.section.section--reading
            carousel(:perPageCustom="[[768, 3], [1024, 4]]")
                slide.client(v-for="(client, index) of clients" :key="index")
                    a(:href="client.attributes.link" target="blank")
                        b-img.client__logo(:src="strapiImage($axios.defaults.baseURL, client.attributes.logo)" :alt="client.attributes.name")
        b-container.section.section--reading(v-if="testimonies")
            carousel(:perPageCustom="[[768, 1], [1024, 2]]")
                slide.testimony(v-for="(testimony, index) of testimonies")
                    card-testimony.testimony__card(
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
            clients: [],
            testimonies: [],
            page: {}
        }
    },
    methods: {
        async getClients() {
            try {
                let clients = await this.$axios.$get('/api/clients?populate=*&sort[0]=order')
                this.clients = clients.data
                console.log('test', this.clients)
            } catch (error) { }
        },
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
            } catch (error) { }
        },
        strapiImage
    },
    mounted() {
        this.getClients()
        this.getPage()
        this.getTestimonies()
    }
})
</script>
<style lang="scss" scoped>
.client {
    text-align: center;
    .client__logo {
        height: 48px; width: auto;
    }
}
.testimony {
    .testimony__card{
        margin: .5rem 1rem;
    }
}
</style>