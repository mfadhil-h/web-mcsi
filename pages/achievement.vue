<template lang="pug">
.achievement
  PageHeader(
    :image="strapiImage($axios.defaults.baseURL, page.headerBackground)",
    :heading1="page.header1",
    :heading2="page.header2",
    v-if="page.headerBackground != null"
  )
  b-container(fluid)
    b-container.section.section--reading.text-center(v-if="page")
      b-card.section__bg(no-body)
        .section__title {{ page.sectionTitle }}
        .section__body {{ page.sectionDescription }}
  b-container.section
    no-ssr
      div(v-for="(group, index) of awardGroups", :key="index")
        b-card.section__bg(no-body)
          .display-2 {{ group.attributes.awardPeriod }}
        carousel.carousel(
          autoplay,
          :autoplayTimeout="3000",
          loop,
          paginationActiveColor="#CC0000FF",
          paginationColor="#CC000066",
          :perPageCustom="[ [768, 3], [1024, 4], ]"
        )
          slide.carousel__slide(
            v-for="(award, index) of filterAward(group.id)",
            :key="index"
          )
            Thumbnail(
              :image="strapiImage($axios.defaults.baseURL, award.attributes.image)",
              :heading="award.attributes.name",
              :subheading="award.attributes.year",
              @click="showModalAward(strapiImage($axios.defaults.baseURL, award.attributes.image), award.attributes.year, award.attributes.name, award.attributes.description)"
            )
  b-modal#modal-award(size="lg", hide-footer, centered)
    b-container.award(fluid)
      .text-center
        b-img.award__image(:src="dataSelected.image")
        .award__label {{ dataSelected.label }}
        .award__year {{ dataSelected.year }}
      .award__description {{ dataSelected.description }}
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import Thumbnail from '@/components/Thumbnail.vue'
import { strapiImage } from '~/utilities/StrapiImage'
export default Vue.extend({
  name: 'Achievement',
  components: {
    PageHeader,
    Thumbnail
  },
  layout: 'SinglePage',
  data: () => {
    return {
      awardGroups: [],
      awards: [],
      dataSelected: {
        image: '',
        year: '',
        label: '',
        description: ''
      },
      page: {}
    }
  },
  mounted () {
    this.getPage()
    this.getAwardGroups()
    this.getAwards()
  },
  updated () {
    const dots = document.getElementsByClassName('VueCarousel-dot')
    for (let index = 0; index < dots.length; index += 1) {
      const element: any = dots[index]
      element.title = ''
    }
  },
  methods: {
    async getAwardGroups () {
      try {
        const awardGroups = await this.$axios.$get('/api/award-groups')
        this.awardGroups = awardGroups.data
      } catch (error) {}
    },
    async getAwards () {
      try {
        const awards = await this.$axios.$get('/api/awards?populate=*')
        this.awards = awards.data
      } catch (error) {}
    },
    async getPage () {
      try {
        const page = await this.$axios.$get('/api/page-award?populate=*')
        this.page = page.data.attributes
      } catch (error) {}
    },
    filterAward (awardGroupId: number) {
      const result = this.awards.filter(
        (award: any) => award.attributes.award_group.data.id == awardGroupId
      )
      return result
    },
    showModalAward (
      image: string,
      year: string,
      label: string,
      description: string
    ) {
      this.dataSelected = {
        image,
        year,
        label,
        description
      }
      this.$bvModal.show('modal-award')
    },
    strapiImage
  }
})
</script>
<style lang="scss" scoped>
.award {
  .award__image {
    margin-bottom: 2rem;
    max-width: 320px;
    width: 100%;
    height: auto;
  }
  .award__label {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -1px;
    line-height: 32px;
    margin-bottom: 0.5rem;
  }
  .award__year {
    color: rgba(black, 0.7);
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 2rem;
  }
  .award__description {
    margin-top: 2rem;
  }
}
.carousel {
  margin-left: -1rem;
  margin-right: -1rem;
  .carousel__slide {
    padding: 1rem;
  }
}
</style>
