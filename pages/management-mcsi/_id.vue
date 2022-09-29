<template lang="pug">
.management-detail
   PageHeader(
      :image='strapiImage($axios.defaults.baseURL, management.attributes.image)',
      v-if='management.attributes'
   )
   b-container(fluid)
      b-container.section.section--reading
         b-card.section__bg(no-body)
            .profile(v-if='managementData.description')
               .profile__name {{ managementData.name }}
               .profile__position {{ managementData.position }}
               .profile__description(
                  v-if='managementData.description',
                  v-html='micromark(managementData.description)'
               )
            .py-4.text-center(v-else)
               .p {{ $t("notFound") }}
         .py-4
            page-nav(
               :left-text='$t("navLabel")',
               :left-button-text='$t("nav")',
               @clickLeft='goBack',
               hide-right
            )
</template>

<script lang="ts">
import Vue from 'vue'
import { micromark } from 'micromark'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'

export default Vue.extend({
   name: 'OrgchartMcsiId',
   components: {
      PageHeader
   },
   layout: 'SinglePage',
   data: () => {
      return {
         management: {} as any,
         managementData: {} as any
      }
   },
   mounted() {
      this.getManagement()
   },
   methods: {
      async getManagement() {
         try {
            const resManagement = await this.$axios.$get(
               `/api/organization-chart-mcsis/${this.$route.params.id}?populate=*`
            )
            this.management = resManagement.data
            const managementData = {
               name:
                  resManagement.data.attributes.locale === localStorage.lang
                     ? resManagement.data.attributes.name
                     : resManagement.data.attributes.localizations.data.filter(
                          (data: any) =>
                             data.attributes.locale === localStorage.lang
                       )[0].attributes.name,
               position:
                  resManagement.data.attributes.locale === localStorage.lang
                     ? resManagement.data.attributes.position
                     : resManagement.data.attributes.localizations.data.filter(
                          (data: any) =>
                             data.attributes.locale === localStorage.lang
                       )[0].attributes.position,
               description:
                  resManagement.data.attributes.locale === localStorage.lang
                     ? resManagement.data.attributes.description
                     : resManagement.data.attributes.localizations.data.filter(
                          (data: any) =>
                             data.attributes.locale === localStorage.lang
                       )[0].attributes.description
            }
            this.managementData = managementData
         } catch (error) {}
      },
      goBack() {
         const route =
            localStorage.lang === 'id'
               ? '/management-mcsi'
               : '/' + localStorage.lang + '/management-mcsi'
         this.$router.push(route)
      },
      micromark,
      strapiImage
   }
})
</script>
<style lang="scss" scoped>
.profile {
   .profile__name {
      font-size: 30px;
      font-weight: 700;
      letter-spacing: -2px;
      line-height: 32px;
      @media screen and (max-width: 767px) {
         font-size: 28px;
         line-height: 32px;
      }
   }
   .profile__position {
      color: rgba(black, 0.54);
      font-size: 24px;
      letter-spacing: -1px;
      line-height: 32px;
      margin-top: 1rem;
      text-transform: uppercase;
   }
   .profile__description {
      margin-top: 4rem;
      p {
         font-size: 16px;
         line-height: 24px;
         margin-bottom: 40px;
      }
   }
}
</style>
<style scoped>
.profile__description >>> * {
   text-align: justify;
}
.profile__description >>> h1,
.profile__description >>> h2,
.profile__description >>> h3,
.profile__description >>> h4,
.profile__description >>> h5,
.profile__description >>> h6 {
   letter-spacing: -1px;
}
</style>
<i18n>
{
   "id": {
      "nav": "Kembali",
      "navLabel": "Manajemen",
      "notFound": "Konten tidak ditemukan."
   },
   "en": {
      "nav": "Back",
      "navLabel": "Management",
      "notFound": "Content not found."
   }
}
</i18n>
