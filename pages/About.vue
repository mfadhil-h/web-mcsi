<template lang="pug">
.company-profile
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section(v-if="page")
            b-row
                b-col(cols="12")
                    .section__title {{page.sectionTitle}}
            b-row.mt-4
                b-col(cols="12" md="6")
                    .section__body.mt-0 {{page.sectionDescription}}
                b-col(cols="12" md="6")
                    b-img.company__image(:src="strapiImage($axios.defaults.baseURL, page.image1)" v-if="page.image1")
                    b-img.company__image(:src="strapiImage($axios.defaults.baseURL, page.image2)" v-if="page.image2")
    b-container.company__vision(fluid)
        b-container.section(v-if="page")
            b-card-group(deck)
                b-card.vision
                    .vision__icon
                        font-awesome-icon.icon__fa(icon="eye")
                    .vision__label Vision
                    .vision__description {{page.vision}}
                b-card.vision
                    .vision__icon
                        font-awesome-icon.icon__fa(icon="bullseye")
                    .vision__label Mission
                    .vision__description {{page.mission}}
                b-card.vision
                    .vision__icon
                        font-awesome-icon.icon__fa(icon="trophy")
                    .vision__label Company Value
                    .vision__description {{page.companyValue}}
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
    name: 'company-profile',
    layout: 'SinglePage',
    components: {
        PageHeader
    },
    data: () => {
        return {
            page: {}
        }
    },
    methods: {
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-about?populate=*')
                this.page = page.data.attributes
                console.log('page', this.page)
            } catch (error) { } 
        },
        strapiImage
    },
    mounted() {
        this.getPage()
    }
})
</script>
<style lang="scss" scoped>
.company-profile {
    .company__image {
        margin-bottom: 1rem;
        width: 100%; height: auto
    }
    .company__vision {
        background: #EAEAEA;
    }
}
.vision {
    border-radius: 16px;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    padding: 1rem;
    text-align: center;
    user-select: none;
    .vision__icon {
        background-color: #EAEAEA;
        border-radius: 32px;
        height: 64px; width: 64px;
        margin: 0 auto;
        position: relative;
        .icon__fa {
            color: #154D6D;
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%,-50%);
        }
    }
    .vision__label {
        color: #CC0000;
        font-size: 24px;
        font-weight: 700;
        margin-top: 1.5rem;
    }
    .vision__description {
        margin-top: 3rem;
    }
}
</style>
