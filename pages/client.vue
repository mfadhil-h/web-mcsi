<template lang="pug">
.client-page
  PageHeader(
    :image="strapiImage($axios.defaults.baseURL, page.headerBackground)",
    :heading1="page.header1",
    :heading2="page.header2",
    v-if="page.headerBackground != null"
  )
  b-container(fluid)
    b-container.section.section--reading.text-center
      b-row
        b-col(cols="12")
          .section__title {{ page.sectionTitle }}
          .section__body {{ page.sectionDescription }}
    b-container.section.section--reading
      carousel(
        autoplay,
        :autoplayTimeout="3000",
        loop,
        paginationActiveColor="#CC0000FF",
        paginationColor="#CC000066",
        :perPageCustom="[ [0, 2], [768, 3], [1024, 4], ]"
      )
        slide.client(v-for="(client, index) of clients", :key="index")
          a(:href="client.attributes.link", target="blank")
            b-img.client__logo(
              :src="strapiImage($axios.defaults.baseURL, client.attributes.logo)",
              :alt="client.attributes.name"
            )
    b-container.section.section--reading(v-if="testimonies")
      carousel(
        autoplay,
        :autoplayTimeout="3000",
        loop,
        paginationActiveColor="#CC0000FF",
        paginationColor="#CC000066",
        :perPageCustom="[ [0, 1], [768, 2], ]"
      )
        slide.testimony(
          v-for="(testimony, index) of testimonies",
          :key="index"
        )
          card-testimony.testimony__card(
            :key="index",
            :person="testimony.attributes.person",
            :avatar="strapiImage($axios.defaults.baseURL, testimony.attributes.avatar)",
            :position="testimony.attributes.position",
            :testimony="testimony.attributes.testimony",
            @click="showModalTestimony(testimony.attributes.testimony)"
          )
  b-modal#modal-testimony(size="lg", hide-footer, centered)
    p.text-justify {{ testimonySelected }}
</template>

<script lang="ts">
import Vue from 'vue'
import CardTestimony from '@/components/CardTestimony.vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
  name: 'Client',
  components: {
    CardTestimony,
    PageHeader
  },
  layout: 'SinglePage',
  data: () => {
    return {
      clients: [],
      testimonies: [],
      testimonySelected: '',
      page: {}
    }
  },
  mounted () {
    this.getClients()
    this.getPage()
    this.getTestimonies()
  },
  updated () {
    const dots = document.getElementsByClassName('VueCarousel-dot')
    for (let index = 0; index < dots.length; index += 1) {
      const element: any = dots[index]
      element.title = ''
    }
  },
  methods: {
    async getClients () {
      try {
        const clients = await this.$axios.$get(
          '/api/clients?populate=*&sort[0]=order'
        )
        this.clients = clients.data
      } catch (error) {}
    },
    async getPage () {
      try {
        const page = await this.$axios.$get('/api/page-client?populate=*')
        this.page = page.data.attributes
      } catch (error) {}
    },
    async getTestimonies () {
      try {
        const testimonies = await this.$axios.$get('/api/testimonies?populate=*')
        this.testimonies = testimonies.data
      } catch (error) {}
    },
    showModalTestimony (description: string) {
      this.testimonySelected = description
      this.$bvModal.show('modal-testimony')
    },
    strapiImage
  }
})
</script>
<style lang="scss" scoped>
.client {
  text-align: center;
  .client__logo {
    height: 80px;
    object-fit: contain;
  }
}
.testimony {
  .testimony__card {
    margin: 0.5rem 1rem;
  }
}
</style>
