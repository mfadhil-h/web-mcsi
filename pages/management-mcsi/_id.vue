<template lang="pug">
.management-detail
   PageHeader(
      :image='strapiImage($axios.defaults.baseURL, management.attributes.image)',
      v-if='management.attributes'
   )
   b-container(fluid)
      b-container.section.section--reading
         b-card.section__bg(no-body)
            .profile(v-if='management.attributes')
               .profile__name {{ management.attributes.name }}
               .profile__position {{ management.attributes.position }}
               .profile__description(
                  v-html='micromark(management.attributes.description)'
               )
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
         management: {} as any
      }
   },
   mounted() {
      this.getManagement()
   },
   methods: {
      async getManagement() {
         try {
            const managements = await this.$axios.$get(
               `/api/organization-chart-mcsis/${this.$route.params.id}?populate=*`
            )
            this.management = managements.data
         } catch (error) {}
      },
      goBack() {
         this.$router.go(-1)
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
      "navLabel": "Manajemen"
   },
   "en": {
      "nav": "Back",
      "navLabel": "Management"
   }
}
</i18n>
