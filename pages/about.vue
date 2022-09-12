<template lang="pug">
.company-profile
   PageHeader(
      :image='strapiImage($axios.defaults.baseURL, page.headerBackground)',
      :heading1='page.header1',
      :heading2='page.header2',
      v-if='page.headerBackground'
   )
   b-container(fluid)
      b-container.section(v-if='page')
         b-row
            b-col.text-center.mb-4(cols='12')
               .section__title {{ page.sectionTitle }}
         b-row.mt-4
            b-col(cols='12', md='5')
               .section__body.mt-0.mb-4 {{ page.sectionDescription }}
            b-col(cols='12', md='7')
               b-row
                  b-col(cols='12')
                     youtube-player(:src='page.youtubeLink')
                  b-col(cols='12', md='6')
                     b-img.company__image(
                        :src='strapiImage($axios.defaults.baseURL, page.image1)',
                        v-if='page.image1'
                     )
                  b-col(cols='12', md='6')
                     b-img.company__image(
                        :src='strapiImage($axios.defaults.baseURL, page.image2)',
                        v-if='page.image2'
                     )
   b-container.company__vision(fluid)
      .ribbon
      b-container.section(v-if='page')
         b-card-group(deck)
            b-card.vision(no-body)
               b-card-body
                  .vision__icon
                     font-awesome-icon.icon__fa(icon='eye')
                  .vision__label {{ $t("vision") }}
                  .vision__description {{ page.visionShort }}
               b-card-footer
                  .vision__link(v-b-modal.modal-vision)
                     span {{ $t("more") }}
                     font-awesome-icon.ml-2(icon='circle-arrow-right')
            b-card.vision(no-body)
               b-card-body
                  .vision__icon
                     font-awesome-icon.icon__fa(icon='bullseye')
                  .vision__label {{ $t("mission") }}
                  .vision__description {{ page.missionShort }}
               b-card-footer
                  .vision__link(v-b-modal.modal-mission)
                     span {{ $t("more") }}
                     font-awesome-icon.ml-2(icon='circle-arrow-right')
            b-card.vision(no-body)
               b-card-body
                  .vision__icon
                     font-awesome-icon.icon__fa(icon='trophy')
                  .vision__label {{ $t("value") }}
                  .vision__description {{ page.companyValueShort }}
               b-card-footer
                  b-link.vision__link(:to='"/company-value"')
                     span {{ $t("more") }}
                     font-awesome-icon.ml-2(icon='circle-arrow-right')
   b-modal#modal-vision(
      size='lg',
      hide-footer,
      centered,
      :title='$t("vision")'
   )
      .modal-vision__content(
         v-html='micromark(page.visionLong)',
         v-if='page.visionLong'
      )
   b-modal#modal-mission(
      size='lg',
      hide-footer,
      centered,
      :title='$t("mission")'
   )
      .modal-vision__content(
         v-html='micromark(page.missionLong)',
         v-if='page.missionLong'
      )
   b-modal#modal-company-value(
      size='lg',
      hide-footer,
      centered,
      :title='$t("value")'
   )
      .modal-vision__content(
         v-html='micromark(page.companyValueLong)',
         v-if='page.companyValueLong'
      )
</template>
<script lang="ts">
import Vue from 'vue'
import { micromark } from 'micromark'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
import YoutubePlayer from '@/components/YoutubePlayer.vue'
export default Vue.extend({
   name: 'CompanyProfile',
   components: {
      PageHeader,
      YoutubePlayer
   },
   layout: 'SinglePage',
   data: () => {
      return {
         page: {}
      }
   },
   mounted() {
      this.getPage()
   },
   methods: {
      async getPage() {
         try {
            const page = await this.$axios.$get('/api/page-about?populate=*')
            this.page = page.data.attributes
         } catch (error) {}
      },
      micromark,
      strapiImage
   }
})
</script>
<style lang="scss" scoped>
.company-profile {
   .company__image {
      margin-bottom: 1.5rem;
      width: 100%;
      height: auto;
   }
   .company__vision {
      background: rgba(#eaeaea, 0.5);
      padding-left: 0;
      padding-right: 0;
      position: relative;
      .ribbon {
         position: absolute;
         top: 200px;
         background-color: #cc0000;
         height: 20px;
         width: 100%;
      }
   }
}
.vision {
   border-radius: 16px;
   box-shadow: 0 4px 8px 0 rgba(black, 0.1);
   text-align: center;
   .vision__icon {
      background-color: #eaeaea;
      border-radius: 32px;
      height: 64px;
      width: 64px;
      margin: 0 auto;
      position: relative;
      .icon__fa {
         color: #154d6d;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
      }
   }
   .vision__label {
      color: #cc0000;
      font-size: 20px;
      font-weight: 700;
      margin-top: 1.5rem;
   }
   .vision__description {
      margin-top: 3rem;
      text-align: justify;
   }
   .vision__link {
      color: rgba(black, 0.6);
      float: left;
      font-size: 14px;
      transition-duration: 100ms;
      &:hover {
         color: #cc0000;
         transition-duration: 300ms;
      }
   }
}
</style>
<style scoped>
.modal-vision__content >>> * {
   text-align: justify;
}
</style>
<i18n>
{
   "id": {
      "vision": "Visi",
      "mission": "Misi",
      "value": "Nilai Perusahaan",
      "more": "Selengkapnya"
   },
   "en": {
      "vision": "Vision",
      "mission": "Mission",
      "value": "Corporate Value",
      "more": "Read More"
   }
}
</i18n>
