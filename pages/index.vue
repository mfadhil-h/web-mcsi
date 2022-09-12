<template lang="pug">
.index
   videotron(
      :video-image='strapiImage($axios.defaults.baseURL, page.videoImage)',
      :video='strapiImage($axios.defaults.baseURL, page.video)',
      :header1='page.header1',
      :header2='page.header2',
      @onClickArrow='onClickArrow',
      @onClickPlay='showModalVideoYoutube',
      v-if='page.videoImage'
   )
   b-container#scrollTarget.section
      b-card.section__bg(no-body)
         .display-1 {{ page.sectionBusinessUnitTitle }}
         .display-2 {{ page.sectionBusinessUnitDescription }}
   b-container.p-0(fluid)
      b-row(no-gutters, v-if='companies')
         b-col.company-group(
            cols='12',
            sm='6',
            v-for='(company, index) of companies',
            :key='index'
         )
            b-img.company-group__image(
               :src='strapiImage($axios.defaults.baseURL, company.attributes.image)'
            )
            .company-group__labels
               b-img.company-group__icon(
                  :src='strapiImage($axios.defaults.baseURL, company.attributes.icon)'
               )
               .company-group__label
                  .company-group__name {{ company.attributes.name }}
                  .company-group__description(
                     v-html='micromark(company.attributes.descriptionHtml.substring(0, 120) + " ...")'
                  )
                  .company-group__read-more(
                     @click='showModalCompanyGroupDescription(company.attributes.descriptionHtml)'
                  )
                     span {{ $t("more") }}
                     font-awesome-icon.fw.title__arrow.ml-2(
                        icon='circle-arrow-right'
                     )
   b-container.section--numbers(fluid)
      video-background.section--numbers__background(
         :src='strapiImage($axios.defaults.baseURL, page.sectionNumbersBackground)',
         v-if='page.sectionNumbersBackground'
      )
      .section--numbers__panels
         b-container.section
            .display-1.text-white {{ page.sectionNumbersTitle }}
            .display-2.text-white {{ page.sectionNumbersDescription }}
            b-row.mt-5(v-if='page.numbers')
               b-col(
                  v-for='(number, index) of page.numbers',
                  cols='6',
                  md='3',
                  :key='index'
               )
                  b-card.panel(@click='showModalNumbers(number.description)')
                     .panel__line1 {{ number.line1 }}
                     .panel__number {{ number.number }}
                     .panel__line2 {{ number.line2 }}
   b-modal#modal-company-group.modal-company-group(
      size='lg',
      hide-footer,
      centered
   )
      .company-group__description-full(v-html='micromark(companyDescription)')
   b-modal#modal-numbers.modal-numbers(size='lg', hide-footer, centered)
      .numbers__description(v-html='micromark(numberDescription)')
   b-modal#modal-video-youtube.modal-video-youtube(
      size='xl',
      hide-footer,
      centered
   )
      youtube-player(:src='page.youtubeLink')
</template>

<script lang="ts">
import Vue from 'vue'
import { micromark } from 'micromark'
import { strapiImage } from '@/utilities/StrapiImage'
import Videotron from '@/components/Videotron.vue'
import YoutubePlayer from '@/components/YoutubePlayer.vue'
export default Vue.extend({
   name: 'IndexPage',
   components: {
      Videotron,
      YoutubePlayer
   },
   layout: 'SinglePage',
   data: () => {
      return {
         companies: [],
         companyDescription: '',
         numberDescription: '',
         page: {}
      }
   },
   mounted() {
      this.getCompanyGroup()
      this.getPage()
   },
   methods: {
      async getCompanyGroup() {
         try {
            const companies = await this.$axios.$get(
               '/api/company-groups?populate=*'
            )
            this.companies = companies.data
         } catch (error) {}
      },
      async getPage() {
         try {
            const page = await this.$axios.$get('/api/page-home?populate=*')
            this.page = page.data.attributes
         } catch (error) {}
      },
      micromark,
      onClickArrow() {
         document
            .getElementById('scrollTarget')
            ?.scrollIntoView({ behavior: 'smooth' })
      },
      showModalCompanyGroupDescription(description: string) {
         this.companyDescription = description
         this.$bvModal.show('modal-company-group')
      },
      showModalNumbers(description: string) {
         this.numberDescription = description
         this.$bvModal.show('modal-numbers')
      },
      showModalVideoYoutube() {
         this.$bvModal.show('modal-video-youtube')
      },
      strapiImage
   }
})
</script>
<style lang="scss" scoped>
.company-group {
   cursor: default;
   position: relative;
   .company-group__image {
      filter: brightness(50%);
      height: 480px;
      width: 100%;
      object-fit: cover;
   }
   .company-group__labels {
      color: white;
      padding: 2rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .company-group__icon {
         height: 72px;
         width: auto;
      }
      .company-group__label {
         margin-top: 11rem;
         .company-group__name {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 0.5rem;
         }
         .company-group__description {
            min-height: 72px;
            opacity: 0.8;
         }
         .company-group__read-more {
            font-size: 14px;
            opacity: 0.5;
         }
         @media screen and (max-width: 767px) {
            margin-top: 10rem;
         }
      }
   }
}
.section--numbers {
   padding-left: 0;
   padding-right: 0;
   position: relative;
   height: 640px;
   @media screen and (max-width: 767px) {
      height: 800px;
   }
   .section--numbers__background {
      filter: brightness(25%);
      height: inherit;
      width: 100%;
   }
   .section--numbers__panels {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
   }
}
.panel {
   background: transparent;
   border: 1px solid white;
   border-radius: 8px;
   cursor: default;
   margin-bottom: 1rem;
   transition-duration: 100ms;
   &:hover {
      border: 2px solid #cc0000;
      box-shadow: 0 0 8px 0 rgba(#cc0000, 0.2);
      transition-duration: 100ms;
      .panel__number {
         color: #cc0000;
         transition-duration: 100ms;
      }
   }
   .panel__line1 {
      color: rgba(white, 0.8);
      font-size: 14px;
      margin-bottom: 0.5rem;
   }
   .panel__number {
      color: white;
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 0.1rem;
      transition-duration: 100ms;
   }
   .panel__line2 {
      color: rgba(white, 0.6);
      font-size: 12px;
   }
}
</style>
<style scoped>
.company-group__description >>> * {
   color: white !important;
}
.company-group__description-full >>> * {
   text-align: justify;
}
</style>
<i18n>
{
   "id": {
      "more": "Selengkapnya"
   },
   "en": {
      "more": "Read More"
   }
}
</i18n>
