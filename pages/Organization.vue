<template lang="pug">
.organization
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center(v-if="page")
            .section__title {{page.sectionTitle}}
            .section__body {{page.sectionDescription}}
    b-container.section
        h3.mb-4 Dewan Komisaris dan Direksi
        b-row.mb-5
            b-col(cols="6" md="3" v-for="(person, index) of filterOrganization(people,'commissioner-director')" :key="index" v-if="people")
                thumbnail(
                    :image="strapiImage($axios.defaults.baseURL, person.attributes.image)" 
                    :heading="person.attributes.name" 
                    :subheading="person.attributes.position"
                    @click="showModalProfile(person)")
        h3.mb-4 Manajemen
        b-row
            b-col(cols="6" md="3" v-for="(person, index) of filterOrganization(people,'manager')" :key="index" v-if="people")
                thumbnail(
                    :image="strapiImage($axios.defaults.baseURL, person.attributes.image)" 
                    :heading="person.attributes.name" 
                    :subheading="person.attributes.position"
                    @click="showModalProfile(person)")
    b-modal(id="modal-profile" size="lg" hide-footer centered)
        b-container(fluid).profile
            b-row
                b-col(cols="12" sm="4")
                    b-img.profile__image(:src="strapiImage($axios.defaults.baseURL, personSelected.image)")
                b-col(cols="12" sm="8")
                    .profile__position {{personSelected.position}}
                    .profile__name {{personSelected.name}}
            b-row.profile__description
                b-col(cols="12") {{personSelected.description}}

</template>
<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
import Thumbnail from '@/components/Thumbnail.vue'
export default Vue.extend({
    name: 'management',
    layout: 'SinglePage',
    components: {
        PageHeader,
        Thumbnail
    },
    data: () => {
        return {
            page: {},
            people: [],
            personSelected: {}
        }
    },
    methods: {
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-organization-mcsi?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        async getPeople() {
            try {
                let people = await this.$axios.$get('/api/organization-mcsis?populate=*')
                this.people = people.data
            } catch (error) { }
        },
        filterOrganization(people: any, group: string) {
            return people.filter((person: any) => person.attributes.organizationGroup==group)
        },
        showModalProfile(person: any) {
            this.personSelected = person.attributes
            this.$bvModal.show('modal-profile')
        },
        strapiImage
    },
    mounted() {
        this.getPage()
        this.getPeople()
    }
})
</script>
<style lang="scss" scoped>
.management__org-chart {
    background-color: #EAEAEA;
}
.profile {
    .profile__image {
        width: 100%; height: auto;
    }
    .profile__position {
        color: rgba(black, .7);
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
    }
    .profile__name {
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
        margin-top: 1rem;
    }
    .profile__description {
        margin-top: 2rem;
    }
}
</style>
