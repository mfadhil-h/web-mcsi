<template lang="pug">
.organization
   PageHeader(
      :image='strapiImage($axios.defaults.baseURL, page.headerBackground)',
      :heading1='page.header1',
      :heading2='page.header2',
      v-if='page.headerBackground != null'
   )
   b-container(fluid)
      b-container.section.section--reading.text-center(v-if='page')
         b-card.section__bg(no-body)
            .section__title {{ page.sectionTitle }}
            .section__body {{ page.sectionDescription }}
   b-container.section
      b-card.section__bg(no-body)
         h3.mb-4 {{ $t("sectionCommissioner") }}
      b-row.mb-4
         b-col(
            cols='6',
            md='3',
            v-for='(person, index) of filterOrganization(people,"commissioner-director")',
            :key='index',
            v-if='people'
         )
            thumbnail(
               :image='strapiImage($axios.defaults.baseURL, person.attributes.image)',
               :heading='person.attributes.name',
               :subheading='person.attributes.position',
               @click='showModalProfile(strapiImage($axios.defaults.baseURL, person.attributes.image), person.attributes.position, person.attributes.name, person.attributes.description)'
            )
      b-card.section__bg(no-body)
         h3.mb-4 {{ $t("sectionManagement") }}
      b-row
         b-col(
            cols='6',
            md='3',
            v-for='(person, index) of filterOrganization(people,"manager")',
            :key='index',
            v-if='people'
         )
            thumbnail(
               :image='strapiImage($axios.defaults.baseURL, person.attributes.image)',
               :heading='person.attributes.name',
               :subheading='person.attributes.position',
               @click='showModalProfile(strapiImage($axios.defaults.baseURL, person.attributes.image), person.attributes.position, person.attributes.name, person.attributes.description)'
            )
   //- Link to MCSI Org Chart
   b-container.section
      b-card.section__bg(no-body)
         h3.mb-4 {{ $t("relatedOrganization") }}
         b-link(:to='"/organization-mcsi"')
            font-awesome-icon.fa-fw(icon='sitemap')
            span.ml-2 {{ $t("relatedOrganizationValue") }}
   b-modal#modal-profile(size='lg', hide-footer, centered)
      b-container.profile(fluid)
         b-row
            b-col(cols='12', sm='4')
               b-img.profile__image(:src='personSelected.image')
            b-col(cols='12', sm='8')
               .profile__position {{ personSelected.position }}
               .profile__name {{ personSelected.name }}
         b-row.profile__description
            b-col(cols='12') {{ personSelected.description }}
</template>
<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
import Thumbnail from '@/components/Thumbnail.vue'
export default Vue.extend({
   name: 'ManagementEtsi',
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
               '/api/page-organization-etsi?populate=*'
            )
            this.page = page.data.attributes
         } catch (error) {}
      },
      async getPeople() {
         try {
            const people = await this.$axios.$get(
               '/api/organization-etsis?populate=*'
            )
            this.people = people.data
         } catch (error) {}
      },
      filterOrganization(people: any, group: string) {
         return people.filter(
            (person: any) => person.attributes.organizationGroup === group
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
      width: 100%;
      height: auto;
   }
   .profile__position {
      color: rgba(black, 0.7);
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
   }
   .profile__name {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -1px;
      line-height: 32px;
      margin-top: 0.25rem;
   }
   .profile__description {
      margin-top: 2rem;
   }
}
</style>
<i18n>
{
   "id": {
      "sectionCommissioner": "Dewan Komisaris dan Direksi",
      "sectionManagement": "Manajemen",
      "relatedOrganization": "Organisasi Terkait",
      "relatedOrganizationValue": "Struktur Organisasi MCSI"
   },
   "en": {
      "sectionCommissioner": "Board of Commissioner and Directors",
      "sectionManagement": "Management",
      "relatedOrganization": "Related Organization",
      "relatedOrganizationValue": "MCSI Organization Chart"
   }
}
</i18n>
