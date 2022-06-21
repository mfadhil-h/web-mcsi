<template lang="pug">
.achievement
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section.section--reading.text-center(v-if="page")
            .section__title {{page.sectionTitle}}
            .section__body {{page.sectionDescription}}
    b-container.section
        no-ssr
            div(v-for="(group, index) of awardGroups" :key="index")
                .display-2 {{group.attributes.awardPeriod}}
                carousel.carousel(:perPageCustom="[[768, 3], [1024, 4]]")
                    slide.carousel__slide(v-for="(award, index) of filterAward(group.id)" :key="index")
                        Thumbnail(
                            :image="strapiImage($axios.defaults.baseURL, award.attributes.image)" 
                            :heading="award.attributes.name" 
                            :subheading="award.attributes.year" 
                            @click="showModalAward(strapiImage($axios.defaults.baseURL, award.attributes.image), award.attributes.year, award.attributes.name, award.attributes.description)")
    b-modal(id="modal-award" size="lg" hide-footer centered)
        b-container(fluid).award
            b-row
                b-col(cols="12" sm="4")
                    b-img.award__image(:src="dataSelected.image")
                b-col(cols="12" sm="8")
                    .award__year {{dataSelected.year}}
                    .award__label {{dataSelected.label}}
            b-row.award__description
                b-col(cols="12") {{dataSelected.description}}
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import Thumbnail from '@/components/Thumbnail.vue'
import { strapiImage } from '~/utilities/StrapiImage'
export default Vue.extend({
    name: 'achievement',
    layout: 'SinglePage',
    components: {
        PageHeader,
        Thumbnail
    },
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
    methods: {
        async getAwardGroups() {
            try {
                let awardGroups = await this.$axios.$get('/api/award-groups')
                this.awardGroups = awardGroups.data
            } catch (error) { }
        },
        async getAwards() {
            try {
                let awards = await this.$axios.$get('/api/awards?populate=*')
                this.awards = awards.data
            } catch (error) { }
        },
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-award?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        filterAward(awardGroupId: number) {
            let result = this.awards.filter((award: any) => award.attributes.award_group.data.id == awardGroupId)
            return result
        },
        showModalAward(image: string, year: string, label: string, description: string) {
            this.dataSelected = {
                image: image,
                year: year,
                label: label,
                description: description
            }
            this.$bvModal.show('modal-award')
        },
        strapiImage
    },
    mounted() {
        this.getPage()
        this.getAwardGroups()
        this.getAwards()
    }
})
</script>
<style lang="scss" scoped>
.award {
    .award__image {
        width: 100%; height: auto;
    }
    .award__year {
        color: rgba(black, .7);
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
    }
    .award__label {
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
        margin-top: 1rem;
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
