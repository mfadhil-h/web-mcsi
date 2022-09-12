<template lang="pug">
.organization
    PageHeader(
        :image="strapiImage($axios.defaults.baseURL, page.headerBackground)"
        :heading1="page.header1"
        :heading2="page.header2"
        v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center(v-if="page")
            b-card.section__bg(no-body)
                .section__title {{page.sectionTitle}}
                .section__body {{page.sectionDescription}}
    b-container.section
        b-card.section__bg(no-body)
            h3.mb-4 Dewan Komisaris dan Direksi
        b-row.mb-4
            b-col(cols="6" md="3" v-for="(person, index) of filterOrganization(people,'commissioner-director')" :key="index" v-if="people")
                thumbnail(
                    :image="strapiImage($axios.defaults.baseURL, person.attributes.image)"
                    :heading="person.attributes.name"
                    :subheading="person.attributes.position"
                    @click="showModalProfile(strapiImage($axios.defaults.baseURL, person.attributes.image), person.attributes.position, person.attributes.name, person.attributes.description)")
        b-card.section__bg(no-body)
            h3.mb-4 Manajemen
        b-row
            b-col(cols="6" md="3" v-for="(person, index) of filterOrganization(people,'manager')" :key="index" v-if="people")
                thumbnail(
                    :image="strapiImage($axios.defaults.baseURL, person.attributes.image)"
                    :heading="person.attributes.name"
                    :subheading="person.attributes.position"
                    @click="showModalProfile(strapiImage($axios.defaults.baseURL, person.attributes.image), person.attributes.position, person.attributes.name, person.attributes.description)")
    //- Link to ETSI Org Chart
    b-container.section
        b-card.section__bg(no-body)
            h3.mb-4 Organisasi Terkait
            b-link(:to="'/organization-etsi'")
                font-awesome-icon.fa-fw(icon="sitemap")
                span.ml-2 Struktur Organisasi ETSI
    b-modal(id="modal-profile" size="lg" hide-footer centered)
        b-container(fluid).profile
            .text-center
                b-img.profile__image(:src="personSelected.image")
                .profile__name {{personSelected.name}}
                .profile__position {{personSelected.position}}
            .profile__description {{personSelected.description}}

</template>
<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
import Thumbnail from '@/components/Thumbnail.vue'
export default Vue.extend({
   name: 'ManagementMcsi',
   components: {
      PageHeader,
      Thumbnail
   },
   layout: 'SinglePage',
   data: () => {
      return {
         page: {},
         people: [],
         personSelected: {}
      }
   },
   mounted() {
      this.getPage()
      this.getPeople()
   },
   methods: {
      async getPage() {
         try {
            const page = await this.$axios.$get(
               '/api/page-organization-mcsi?populate=*'
            )
            this.page = page.data.attributes
         } catch (error) {}
      },
      async getPeople() {
         try {
            const people = await this.$axios.$get(
               '/api/organization-mcsis?populate=*'
            )
            this.people = people.data
         } catch (error) {}
      },
      filterOrganization(people: any, group: string) {
         return people.filter(
            (person: any) => person.attributes.organizationGroup == group
         )
      },
      showModalProfile(
         image: string,
         position: string,
         name: string,
         description: string
      ) {
         this.personSelected = {
            image,
            position,
            name,
            description
         }
         this.$bvModal.show('modal-profile')
      },
      strapiImage
   }
})
</script>
<style lang="scss" scoped>
.management__org-chart {
   background-color: #eaeaea;
}
.section {
   .section__title {
      color: black;
   }
}
.profile {
   .profile__image {
      margin-bottom: 2rem;
      max-width: 320px;
      width: 100%;
      height: auto;
   }
   .profile__name {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -1px;
      line-height: 32px;
      margin-bottom: 0.5rem;
   }
   .profile__position {
      color: rgba(black, 0.7);
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      margin-bottom: 2rem;
   }

   .profile__description {
      margin-top: 2rem;
   }
}
</style>
